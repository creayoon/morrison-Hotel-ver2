import mongodb from 'mongodb';
import mongoMock from 'mongo-mock';
import config from 'config';
import fs from 'fs';

export const MongoClient =
    process.env.NODE_ENV === 'test' ? mongoMock.MongoClient : mongodb.MongoClient;

const mongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));
// 서버가 돌기 전이라서 sync걸어도 좋아서 sync씀

export class MongoDB {
  static insert(cb, collection, ...values) {
    if (!collection || !values) {
      cb(new Error('error'));
      return;
    }

    MongoClient.connect(mongoConfig.url, (connErr, db) => {
      if (connErr) {
        cb(connErr);
        return;
      }

      db.collection(collection).insertMany(values, (dbErr, res) => {
        if (dbErr) {
          cb(dbErr);
          return;
        }

        // data가 깨지거나 했을 경우를 대비
        if (values.length !== res.insertedCount) {
          cb(new Error('fail insert'));
          // 원래는 rollback코드도 추가하는것이 좋다
          return;
        }

        db.close();

        cb();
      });
    });
  }

  static delete(cb, collection, ...values) {
    if (!collection || !values) {
      cb(new Error('error'));
      return;
    }

    MongoClient.connect(mongoConfig.url, (connErr, db) => {
      if (connErr) {
        db.close();
        cb(connErr);
        return;
      }

      // delete, remove 차이점 찾기
      // query 쓰는 방법 익히기
      // db.collection(collection).deleteMany(values, (dbErr, res) => {
      db.collection(collection).deleteMany(values[0], (dbErr, res) => {
        if (dbErr) {
          db.close();
          cb(dbErr);
          return;
        }

        // delete error 대비
        if (values.length !== res.deletedCount) {
          db.close();
          cb(new Error('fail delete'));
          // 추후 delete rollback
          // mongo에서 기본 제공하지 않음 -> 삭제하기 전 복사해뒀다가 다시 되살리는 방식으로 rollback해야 함
          return;
        }
        db.close();

        cb();
      });
    });
  }
}

