import test from 'tape';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';
import UserController from '../../../server/controllers/user-controller';
import UserService from '../../../server/services/user-service';



// mock ------------------
const expected = {
  status: 200,
  data: 'body'
};

const res = httpMocks.createResponse();

const data = res._getData(); // eslint-disable-line no-underscore-dangle


// test ------------------
test('user-contoller get', t => {
  function mockGetAllUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  
  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/api/users/get'
  });
  
  sinon.stub(UserService, 'getAllUser').callsFake(mockGetAllUser);
  

  UserController.get(req, res, () => {
    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data, expected.data, 'should be same data');
    t.end();
  });

  UserService.getAllUser.restore(); // The original function restored
});

// test('user-contoller getUserById', t => {
//   function mockGetUser(id) {
//     return new Promise((resolve) => {
//       resolve(expected.data);
//     });
//   }
//   sinon.stub(UserService, 'getUser').callsFake(mockGetUser);

//   UserController.get(req, res, () => {
//     t.equal(res.statusCode, expected.status, 'should be same status');
//     t.equal(data, expected.data, 'should be same data');
//     t.end();
//   });

//   UserService.getUser.restore();
// });
