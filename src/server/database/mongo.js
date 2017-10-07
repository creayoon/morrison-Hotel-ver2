import {MongoClient} from 'mongodb';
import {Logger} from 'winston';
import config from 'config';
import fs from 'fs';

const mongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));

export class MongoDB {
  static insert(cb, collection, ...values) {
    if (!collection || !values) {
      cb(new Error("Invalid argument exception"));
      return;
    }

    MongoClient.connect(mongoConfig.url, (connErr, db) => {
      if (connErr) {
        cb(connErr);
        return;
      }

      db.collection(collection).insertMany(values, (dbErr, r) => {
        if (dbErr) {
          cb(dbErr);
          return;
        }

        if (values.length !== r.insertedCount) {
          cb(new Error("insert fail"));
          return;
        }
        db.close();

        cb();
      });
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
