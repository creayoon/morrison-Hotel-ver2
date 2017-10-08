import mongodb from 'mongodb';
import mongoMock from 'mongo-mock';
import {Logger} from 'winston';
import config from 'config';
import fs from 'fs';

export const MongoClient = process.env.NODE_ENV === 'test' ?
    mongoMock.MongoClient : mongodb.MongoClient;

const mongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));

export class MongoDB {
  static insert(collection, ...values) {
    if (!collection || !values) {
      return Promise.reject(new Error('Invalid argument exception'));
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(mongoConfig.url, (err, db) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(db);
      });
    })
    .then(db => {
      db.collection(collection).insertMany(values, (err, r) => {
        if (err) throw err; // eslint-disable-line curly

        if (values.length !== r.insertedCount) {
          throw new Error('insert fail');
        }
        db.close();
      });
    })
    .catch(err => {
      // database error handling
      Logger.error(err);
    });
  }
}

export class MongoError {
  static connectionErrorReport(err) {
    if (!err) return false; // eslint-disable-line curly
    Logger.error(`MongoDB connecton Error ${err.message}`);
    return true;
  }

  static dbErrorReport(err) {
    if (!err) return false; // eslint-disable-line curly
    Logger.error(`MongoDB internal Error ${err.message}`);
    return true;
  }
}
