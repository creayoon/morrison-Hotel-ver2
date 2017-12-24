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

const dataUpdateMany = [
  {
    id: 'cookie',
    name: 'spider man',
    social: 'instagram',
    image: 'https://minions.jpg'
  },
  {
    id: 'bread',
    name: 'bet man',
    social: 'facebook',
    image: 'https://minions111.jpg'
  }
];

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
const mockUpdateData = JSON.parse(JSON.stringify(dataUser));
mockUpdateData.name = 'helloworld';
const condition = { name: 'helloworld' };
const value = { social: 'google' };



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
      t.equal(2, res.insertedCount, 'should be same number');
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
      t.equal(2, res.insertedCount, 'should be same number');
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
      console.log(res);
      t.equal(2, res.length, 'should be same number');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });
});

// mongoDB read할때 error case가 있나..?


// update one
test('MongoDB update one', t => {
  deleteAll();

  MongoDB.insert(collection, mockUpdateData)
    .then(() => MongoDB.update(collection, condition, value))
    .then(res => {
      t.equal(2, res.matchedCount, 'should be same size'); // count each field
      // t.pass('success');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });
});

// update many
test('MongoDB update many', t => {
  deleteAll();

  dataUpdateMany.map(() => MongoDB.insert(collection, mockUpdateData)
    .then(() => MongoDB.update(collection, condition, value))
    .then(res => {
      console.log(mockUpdateData)
      
      t.equal(2, res.matchedCount, "should be same size");
      t.pass('success');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    })
  );
});

// delete
// test('MongoDB delete many', t => {
//   MongoDB.insert((insertErr) => {
//     if (insertErr) {
//       t.fail();
//     }
//     MongoDB.delete((deleteErr) => {
//       if (deleteErr) t.fail();
//       // console.log('here');
//       t.end();
//     }, collection, dataAlice);
//   }, collection, dataAlice);
// });
