import test from 'tape';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';
import UserController from '../../../server/controllers/user-controller';
import UserService from '../../../server/services/user-service';


// mock ------------------
const res = httpMocks.createResponse();
const dataset = {
  id: 'cookie',
  name: 'superman',
  social: 'facebook',
  image: 'https://image.com'
}

// 여러개 test..?
// const dataset = [
//   {
//     id: 'cookie',
//     name: 'superman',
//     social: 'facebook',
//     image: 'https://image.com'
//   },
//   {
//     id: 'cake',
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

// test ------------------
// insert ------------------
test('user-contoller post', t => {
  const expected = {
    status: 200,
    data: dataset
  };

  function mockaddUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  sinon.stub(UserService, 'addUser').callsFake(mockaddUser);

  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/api/users',
    body: dataset
  });

  UserController.post(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle
    // console.log(data);

    // ObjectId 제외하고 비교하려면..?

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data.ops[0], expected.data, 'should be same data');
    t.end();
  });

  UserService.addUser.restore();
});
//
// // get ------------------
// test('user-contoller get', t => {
//   const expected = {
//     status: 200,
//     data: 'body'
//   };
//
//   function mockGetAllUser() {
//     return new Promise((resolve) => {
//       resolve(expected.data);
//     });
//   }
//   sinon.stub(UserService, 'getAllUser').callsFake(mockGetAllUser);
//
//   const req = httpMocks.createRequest({
//     method: 'GET',
//     url: '/api/users'
//   });
//
//   UserController.get(req, res, () => {
//     const data = res._getData(); // eslint-disable-line no-underscore-dangle
//
//     t.equal(res.statusCode, expected.status, 'should be same status');
//     t.equal(data, expected.data, 'should be same data');
//     t.end();
//   });
//
//   UserService.getAllUser.restore();
// });
//
// // getById ------------------
// test('user-contoller getById', t => {
//   const expected = {
//     status: 200,
//     data: {
//       id: 'cookie',
//       name: 'superman',
//       social: 'facebook',
//       image: 'https://image.com'
//     }
//   };
//
//   function mockgetUser() {
//     return new Promise((resolve) => {
//       resolve(expected.data);
//     });
//   }
//   sinon.stub(UserService, 'getUser').callsFake(mockgetUser);
//
//
//   const req = httpMocks.createRequest({
//     method: 'GET',
//     url: '/api/users/:id',
//     params: {
//       id: 'cookie'
//     }
//   });
//
//   UserController.getById(req, res, () => {
//     const data = res._getData(); // eslint-disable-line no-underscore-dangle
//     console.log(data);
//
//     t.equal(res.statusCode, expected.status, 'should be same status');
//     t.equal(data.ops[0], expected.data, 'should be same data');
//     t.end();
//   });
//
//   UserService.getUser.restore();
// });

// update ------------------
test('user-contoller update', t => {
  const expected = {
    status: 200,
    data: {
      id: 'cookie',
      name: 'iron man',
      social: 'facebook',
      image: 'https://image-iron.com'
    }
  };

  function mockupdateUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  sinon.stub(UserService, 'updateUser').callsFake(mockupdateUser);


  const req = httpMocks.createRequest({
    method: 'PUT',
    url: '/api/users/:id',
    params: {
      id: 'cookie'
    }
  });

  UserController.put(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle
    console.log(data);

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data.ops[0], expected.data, 'should be same data');
    t.end();
  });

  UserService.updateUser.restore();
});

// delete ------------------
test('user-contoller delete', t => {
  const expected = {
    status: 200,
    data: {
      id: 'cookie',
      name: 'superman',
      social: 'facebook',
      image: 'https://image.com'
    }
  };

  function mockdeleteUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  sinon.stub(UserService, 'deleteUser').callsFake(mockdeleteUser);


  const req = httpMocks.createRequest({
    method: 'DELETE',
    url: '/api/users/:id',
    params: {
      id: 'cookie'
    }
  });

  UserController.delete(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle
    console.log(data);

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data.ops[0], expected.data, 'should be same data');
    t.end();
  });

  UserService.deleteUser.restore();
});

