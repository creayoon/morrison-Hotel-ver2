// import mongoMock from 'mongo-mock';
import test from 'tape';
import { MongoDB } from '../../../server/database/mongo';


const collection = 'testCollection';

const dataAlice = {
  name: 'alice',
  name2: '222',
  name3: '333',
  name4: '444',
  name5: '555',
  name6: '666',
  name7: '777',
  name8: '888',
  name9: '999'
};

const dataUser = {
  name: 'minions Bob',
  social: 'facebook',
  image: 'https://i.pinimg.com/736x/3e/0b/d9/3e0bd971ef4434d9354ee6dde37aed88--minions-cartoon-despicable-minions.jpg' // eslint-disable-line max-len
};

test('MongoDB insert many', t => {
  MongoDB.insert(collection, dataUser, dataAlice)
      .then(res => {
        t.equal(2, res.insertedCount, 'should be same number');
        t.end();
      })
      .catch(err => {
        t.fail(err);
        t.end();
      });
});

test('MongoDB delete many', t => {
  MongoDB.insert((insertErr) => {
    if (insertErr) {
      t.fail();
    }
    MongoDB.delete((deleteErr) => {
      if (deleteErr) t.fail();
      // console.log('here');
      t.end();
    }, collection, dataAlice);
  }, collection, dataAlice);
});
