// import mongoMock from 'mongo-mock';
import test from 'tape';
import { MongoDB } from '../../../server/database/mongo';


const collection = 'testCollection';

const dataAlice = {
  name: 'alice'
};

const dataUser = {
  name: 'minions Bob',
  social: 'facebook',
  image: 'https://i.pinimg.com/736x/3e/0b/d9/3e0bd971ef4434d9354ee6dde37aed88--minions-cartoon-despicable-minions.jpg' // eslint-disable-line max-len
};

test('MongoDB insert one', t => {
  MongoDB.insert((err) => {
    if (err) {
      t.fail();
    }
    t.end();
  }, collection, dataUser);
});

test('MongoDB delete one', t => {
  MongoDB.insert((insertErr) => {
    if (insertErr) {
      t.fail();
    }
    MongoDB.delete((deleteErr) => {
      if (deleteErr) t.fail();
      t.end();
    }, collection, dataAlice);
  }, collection, dataAlice);
});
