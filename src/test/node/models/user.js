import test from 'tape';
import UserModel from '../../../server/models/user';


test('UserModel with invalid argument test', t => {
  try {
    new UserModel(); // eslint-disable-line no-new
    new UserModel(1); // eslint-disable-line no-new
    new UserModel({}); // eslint-disable-line no-new
    t.fail();
  } catch (err) {
    t.skip('success');
  }
  t.end();
});


test('UserModel with valid argument test', t => {
  const expected = {
    name: 'alice',
    social: 'some-social',
    image: 'http://some.usl.here.com'
  };

  const user = new UserModel('alice');
  t.equal(expected.name, user.name, 'should be same name');
  t.end();
});
