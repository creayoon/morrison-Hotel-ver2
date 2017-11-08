import mongodb from 'mongodb';
import mongoMock from 'mongo-mock';
import config from 'config';
import fs from 'fs';
import { Logger } from 'winston';

export const MongoClient =
    process.env.NODE_ENV === 'test' ? mongoMock.MongoClient : mongodb.MongoClient;

const mongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));
// 서버가 돌기 전이라서 sync걸어도 좋아서 sync씀

export class MongoDB {
  static insert(collection, ...values) {
    if (!collection || !values) {
      return Promise.reject(new Error('Invalid argument exception'));
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(mongoConfig.url, (connErr, db) => {
        if (connErr) {
          // db.close(); // 여기서 db.close 안해줘도 됨? yc브랜치에 없음
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
    .then(db => {
      db.collection(collection).insertMany(values, (dbErr, res) => {
        if (dbErr) {
          db.close(); // 여기서 db.close 안해줘도 됨? yc브랜치에 없음
          throw dbErr;
          // new Error(dbErr);
          // 그냥 throw dbErr 했을떄랑 차이점?
          // 위에서 error가 이미 생성되서 new 할 필요 없어서 그냥 throw?
          // return;
        }

        // data가 깨지거나 했을 경우를 대비
        if (values.length !== res.insertedCount) {
          throw new Error('fail insert');
          // return;
        }

        db.close();
        // cb();
      });
    })
    .catch(connErr => {
      Logger.error('insert Error:::', connErr);
    });
  }

  static delete(collection, ...values) {
    if (!collection || !values) {
      return new Promise.reject(new Error('error'));
    }

    return new Promise ((resolve, reject) => {
      MongoClient.connect(mongoConfig.url, (connErr, db) => {
        if (connErr) {
          // db.close(); // 여기서 db.close 안해줘도 됨?
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
    .then(db => {
      // db.collection(collection).deleteMany(values, (dbErr, res) => {
      db.collection(collection).deleteMany(values, (dbErr) => {
        if (dbErr) {
          db.close();
          // cb(dbErr);
          throw dbErr;
          // return;
        }

        // delete error 대비
        // if (values.length !== res.deletedCount) {
        //   db.close();
        //   Logger.log('deletemany:::::::', values);
        //   Logger.log('deletemany res:::::::', res); // not a function?
          
        //   throw new Error('fail delete');
        //   // .idea 폴더 용도가 뭔지?
        //   // 추후 delete rollback, mongo에서 기본 제공하지 않음, 일단 pass
        //   // return;
        // }

        db.close();
        // cb();
      });
    })
    .catch(connErr => {
      Logger.error('delete Error:::', connErr);
    });
  }
}

// promise 수정 전 코드
  // static insert(cb, collection, ...values) {
  //   if (!collection || !values) {
  //     cb(new Error('error'));
  //     return;
  //   }

  //   MongoClient.connect(mongoConfig.url, (connErr, db) => {
  //     if (connErr) {
  //       cb(connErr);
  //       return;
  //     }

  //     db.collection(collection).insertMany(values, (dbErr, res) => {
  //       if (dbErr) {
  //         cb(dbErr);
  //         return;
  //       }

  //       // data가 깨지거나 했을 경우를 대비
  //       if (values.length !== res.insertedCount) {
  //         cb(new Error('fail insert'));
  //         // 원래는 rollback코드도 추가하는것이 좋다
  //         return;
  //       }

  //       db.close();

  //       cb();
  //     });
  //   });
  // }
