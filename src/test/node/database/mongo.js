import mongoMock from 'mongo-mock';
import test from 'tape';
import {MongoDB, MongoClient} from '../../../server/database/mongo';

const collection = 'testCollection';
const dataAlice = {
  name: 'alice',
  age: '1'
};
const dataBob = {
  name: 'bob',
  age: '3'
};

test('mongo instance checking', t => {
  t.true(MongoClient === mongoMock.MongoClient, 'should be same');
  t.end();
});

test('MongoDB insert one', t => {
  MongoDB.insert((err) => {
    if (err) {
      t.fail();
    }
    t.end();
  }, collection, dataAlice);
});

test('MongoDB insert multi', t => {
  MongoDB.insert((err) => {
    if (err) {
      t.fail();
    }
    t.end();
  }, collection, dataAlice, dataBob);
});
