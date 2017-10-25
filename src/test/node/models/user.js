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
    // social: 'some-social',
    // image: 'http://some.usl.here.com',
    social: 'facebook',
    image: 'http://mblogthumb3.phinf.naver.net/20150829_146/lhjing7_1440828589438zQNHt_GIF/13.gif?type=w2'
  };

  const user = new UserModel('alice', 'facebook', 'http://mblogthumb3.phinf.naver.net/20150829_146/lhjing7_1440828589438zQNHt_GIF/13.gif?type=w2');
  t.equal(expected.name, user.name, 'should be same name');
  t.equal(expected.social, user.social, 'should be same social');
  t.equal(expected.image, user.image, 'should be same image');
  t.end();
});
