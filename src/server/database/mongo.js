import mongodb from 'mongodb';
import mongoMock from 'mongo-mock';
import config from 'config';
import fs from 'fs';
import { Logger } from 'winston';

export const MongoClient =
  process.env.NODE_ENV === 'test' ? mongoMock.MongoClient : mongodb.MongoClient;

// 서버가 돌기 전이라서 sync걸어도 좋아서 sync씀
const MongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));

export class MongoDB {

  // C: insertMany
  static insert(collection, ...values) {
    if (!collection || !values) {
      return Promise.reject(new Error('Invalid argument exception'));
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(MongoConfig.url, (connErr, db) => {
        if (connErr) {
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
      .then(db => {
        return new Promise((resolve, reject) => {
          db.collection(collection).insertMany(values, (dbErr, res) => {
            db.close();

            if (dbErr) {
              reject(dbErr);
              return;
            }

            // data가 깨지거나 했을 경우를 대비
            if (values.length !== res.insertedCount) {
              reject(new Error('fail insert'));
              return;
            }

            resolve(res);
          });
        });
      })

      // 위의 promise를 풀어쓰면 아래와 같다
      // .then(db => {
      //   const result = db.collection(collection).insertMany(values);
      //   if (result == null) {
      //     throw new Error('db error');
      //   } else if (values.length !== result.insertedCount) {
      //     throw new Error('fail insert');
      //   }
      //   return result.insertedCount;
      // })
      .catch(connErr => {
        // Logger.error('insert Error:::', connErr);
        throw connErr;
      });
  }

  // R: find
  static read(collection, query) {
    if (!collection || !query) {
      return new Promise.reject(new Error('Error')); // eslint-disable-line new-cap
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(MongoConfig.url, (connErr, db) => {
        if (connErr) {
          db.close();
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
      .then(db => {
        return new Promise((resolve, reject) => {
          db.collection(collection)
            .find(query)
            .toArray((err, docs) => {
              db.close();
              if (err) {
                reject(err);
                return;
              }
              resolve(docs);
            });
        });
      })
      .catch(connErr => {
        Logger.error('delete Error:::', connErr);
      });
  }

  // U: updateMany
  // static update(collection, condition, value) {
  static update(collection, value) {
    if (!collection || !value) {
      // console.log('mongo update:' ,collection, value)
      return Promise.reject(new Error('Invalid argument exception'));
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(MongoConfig.url, (connErr, db) => {
        if (connErr) {
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
      .then(db => new Promise((resolve, reject) => {
        // TODO need to generalization
        // const filter = { id: condition.id };
        const filter = { id: value.id };
        const update = { $set: { social: value.social, image: value.image } };

        db.collection(collection).updateMany(filter, update, (dbErr, res) => {
          db.close();
          // err
          if (dbErr) {
            reject(dbErr);
            return;
          }

          // data가 깨지거나 했을 경우를 대비
          // if (res.modifiedCount) throw new Error('fail update');
          resolve(res);
        });
      }))
      .catch(connErr => {
        // TODO check logger error
        // Logger.error('insert Error:::', connErr);
        throw connErr;
      });
  }

  // D: deleteMany
  static delete(collection, condition) {
    if (!collection || !condition) {
      // console.log('mongo update:' ,collection, value)
      return Promise.reject(new Error('Invalid argument exception'));
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(MongoConfig.url, (connErr, db) => {
        if (connErr) {
          reject(connErr);
          return;
        }
        resolve(db);
      });
    })
      .then(db => new Promise((resolve, reject) => {
        // TODO need to generalization
        // const filter = { id: condition.id };
        // const filter = { id: value.id };
        // const update = { $set: { social: value.social, image: value.image } };

        db.collection(collection).deleteMany(condition, (dbErr, res) => {
          db.close();
          // err
          if (dbErr) {
            reject(dbErr);
            return;
          }

          // data가 깨지거나 했을 경우를 대비
          // if (res.modifiedCount) throw new Error('fail update');
          resolve(res);
        });
      }))
      .catch(connErr => {
        // TODO check logger error
        // Logger.error('insert Error:::', connErr);
        throw connErr;
      });
  }

  // clear


}


// promise 수정 전 코드
  // static insert(cb, collection, ...values) {
  //   if (!collection || !values) {
  //     cb(new Error('error'));
  //     return;
  //   }

  //   MongoClient.connect(MongoConfig.url, (connErr, db) => {
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
