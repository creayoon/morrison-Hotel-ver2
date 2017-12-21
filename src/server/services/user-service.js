import User from '../models/user';
import { MongoDB } from '../database/mongo';

export default class UserService {
  static addUser(userInfo) { // eslint-disable-line no-unused-vars
    const user = new User(userInfo.id, userInfo.name, userInfo.social, userInfo.image);

    // insert: input data count
    return MongoDB.insert('user', user)
      .then(result => {
        if (result.insertedCount > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      });
  }

  static getUser(id) { // eslint-disable-line no-unused-vars
    return MongoDB.read('user', { id: id })
      .then(result => {
        // console.log('read result:::', result);
        if (result.length > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      });
  }

  static getAllUser() {
    return MongoDB.read('user', {})
      .then(result => {
        // console.log('read result:::', result);
        if (result.length > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      });
  }

  static updateUser(userInfo) { // eslint-disable-line no-unused-vars
    const user = new User(userInfo.id, userInfo.name, userInfo.social, userInfo.image);

    // insert: input data count
    // update(query, update, options)
    return MongoDB.update('user', user)
      .then(result => {
        if (result.modifiedCount > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      })
      .catch(err => {
        throw err;
      });
  }

  static deleteUser(userId) { // eslint-disable-line no-unused-vars
    return MongoDB.delete('user', { id: userId })
      .then(result => {
        // console.log('read result:::', result);
        if (result.deletedCount > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      });
  }

}
