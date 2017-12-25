// import mongoMock from 'mongo-mock';
import test from 'tape';
import { MongoDB } from '../../../server/database/mongo';


// test datas ------------------
// right cases ----------
const dataId = {
  id: 'cookie'
};

const dataUser = {
  id: 'cookie',
  name: 'minions Bob',
  social: 'facebook',
  image: 'https://minions.jpg'
};

// const dataUpdateMany = [
//   {
//     id: 'cookie',
//     name: 'spiderman',
//     social: 'instagram',
//     image: 'https://minions.jpg'
//   },
//   {
//     id: 'bread',
//     name: 'betman',
//     social: 'facebook',
//     image: 'https://minions-goods.jpg'
//   }
// ];

// wrong cases ----------
// const dataString = 'testCollection';
const dataNoIdUser = {
  name: 'minions Bob',
  social: 'facebook',
  image: 'https://minions.jpg'
};

const dataNames = {
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


// moking data ------------------
// const mockUpdateData = JSON.parse(JSON.stringify(dataUser));
// mockUpdateData.name = 'helloworld';
// const condition = { name: 'helloworld' };
// const value = { social: 'google' };

// test codes ------------------
// delete all test data
function deleteAll() {
  MongoDB.delete({});
}

const collection = 'user';


// insert
test('MongoDB insert many', t => {
  deleteAll();

  MongoDB.insert(collection, dataId, dataUser)
    .then(res => {
      t.equal(res.insertedCount, 2, 'should be same number');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });
});

// insert wrong data cases
test('MongoDB insert many with wrong datas', t => {
  deleteAll();

  MongoDB.insert(collection, dataNoIdUser, dataNames)
    .then(res => {
      t.equal(res.insertedCount, 2, 'should be same number');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });
});


// read
test('MongoDB read many', t => {
  MongoDB.read(collection, { id: 'cookie' })
    .then(res => {
      t.equal(res.length, 2, 'should be same number');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });
});

// mongoDB read할때 error case가 있나..?


// update one
// test('MongoDB update one', t => {
//   deleteAll();

//   const query = { id: 'cookie' };
//   // const value = { social: 'google' };
//   const value = { social: 'google', name: 'wonderwoman' }; // 이거하면 왜 3개 수정되지??

//   MongoDB.insert(collection, dataUser)
//     .then(() => MongoDB.update(collection, query, value))
//     .then(res => {
//       console.log(res);
//       t.equal(1, res.matchedCount, 'should be same size'); // count each field
//       // t.pass('success');
//       t.end();
//     })
//     .catch(err => {
//       t.fail(err);
//       t.end();
//     });
// });

// update many
// test('MongoDB update many', t => {
//   deleteAll();

//   const query = { id: 'cookie' };
//   const value = { social: 'google' };
//   // const value = { social: 'google', name: 'wonderwoman' }; // 이거하면 왜 3개 수정되지??

//   dataUpdateMany.map(data => MongoDB.insert(query, data)
//     .then(() => MongoDB.update(collection, query, value))
//     .then(res => {
//       console.log(data)

//       t.equal(1, res.matchedCount, 'should be same size'); // count each field
//       // t.pass('success');
//       t.end(); // not ok .end() called twice
//     })
//     .catch(err => {
//       t.fail(err);
//       t.end();
//     })
//   );
// });

// delete
test('MongoDB delete many', t => {
  MongoDB.delete(collection, { id: 'cookie' })
  .then(res => {
    t.equal(res.deletedCount, 2, 'should be same number');
    t.end();
  })
  .catch(err => {
    t.fail(err);
    t.end();
  });
});
