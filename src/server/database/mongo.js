import {MongoClient} from 'mongodb';
import {Logger} from 'winston';
import config from 'config';
import fs from 'fs';

console.log(config.mongodb);
const mongoConfig = JSON.parse(fs.readFileSync(config.mongodb, 'utf-8'));

export class MongoDB {
  static insert(cb, collection, ...values) {
    if (!collection || !values) return cb(new Error("Invalid argument exception"));

    MongoClient.connect(mongoConfig.url, (err, db) => {
      if (err) return cb(err);

      db.collection(collection).insertMany(values, (err, r) => {
        if (err) return cb(err);

        if (values.length !== r.insertedCount) return cb(new Error("insert fail"));
        db.close();

        cb();
      });
    });
  }
}

export class MongoError {
  static connectionErrorReport(err) {
    if (!err) return false;
    Logger.error(`MongoDB connecton Error ${err.message}`);
    return true;
  }

  static dbErrorReport(err) {
    if (!err) return false;
    Logger.error(`MongoDB internal Error ${err.message}`);
    return true;
  }
}
