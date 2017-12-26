import test from 'tape';
import sinon from 'sinon';
import UserService from '../../../server/services/user-service';
import {MongoDB} from '../../../server/database/mongo';


const collection = 'user';
const userInfo = {
  id: 'cookie',
  name: 'superman',
  social: 'facebook',
  image: 'https://image.com'
}


// test --------------------
// create --------------------
test('user-service insert', t => {
  const expected = {
    data: userInfo
  };

  function mockMongoDBinsert(col, user) {
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  sinon.stub(MongoDB, 'insert').callsFake(mockMongoDBinsert(collection, expected.data));


  // userInfo 넣었는데 Error: result count less then 0 나오는 상태..
  UserService.addUser(userInfo)
    .then(res => {
      console.log(res);

      // t.equal(res.insertedCount, 2, 'should be same data');
      t.end();
    })
    .catch(err => {
      t.fail(err);
      t.end();
    });

  MongoDB.insert.restore();
});
