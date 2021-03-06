import test from 'tape';
import httpMocks from 'node-mocks-http';
import Controller from '../../../server/controllers/controller';

test('Add Topic', t => {
  const expected = {
    status: 200,
    // body: 'Hello world!'
    body: {
      header: { token: 12345 },
      text: 'Hello world!'
    }

  };

  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/api'
  });
  const res = httpMocks.createResponse();

  Controller.get(req, res, () => {
    const data = res._getData(); // eslint-disable-line no-underscore-dangle
    // console.log('data:::', data);

    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data.text, expected.body.text, 'should be same string');
    t.end();
  });
});
