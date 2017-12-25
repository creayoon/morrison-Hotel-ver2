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



// test ------------------
test('user-contoller get', t => {
  function mockGetAllUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  sinon.stub(UserService, 'getAllUser').callsFake(mockGetAllUser);

  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/api/users'
  });

  UserController.get(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data, expected.data, 'should be same data');
    t.end();
  });

  UserService.getAllUser.restore();
});

test('user-contoller getById', t => {
  function mockgetUser() {
    return new Promise((resolve) => {
      resolve(expected.data);
    });
  }
  sinon.stub(UserService, 'getUser').callsFake(mockgetUser);

  const req = httpMocks.createRequest({
    method: 'GET',
    url: `/api/users/:id`,
    params: {
      id: 'cookie'
    }
  });

  UserController.getById(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle
    console.log(data);

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data, expected.data, 'should be same data');
    t.end();
  });

  UserService.getUser.restore();
});
