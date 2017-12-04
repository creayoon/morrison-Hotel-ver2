import User from '../models/user';
import { MongoDB } from '../database/mongo';

export default class UserService {

  static addUser(userInfo, res) { // eslint-disable-line no-unused-vars
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    // console.log('user service::::', user);

    // insert: input data count
    return MongoDB.insert('user', user)
      .then(result => {
        if (result.insertedCount > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      });

    // update
    // MongoDB.update('user', user)
    //   .then(count => {
    //     if (count > 0) {
    //       res.send(200, user);
    //       return;
    //     }
    //     res.send(500, 'data is not saved');
    //   }).catch(err => {
    //     throw err
    //   });
  }

  static getUser(name, res) { // eslint-disable-line no-unused-vars
    // const user = new User(name);

    return MongoDB.read('user', { name: name });
  }

  static getAllUser(userInfo, res) { // eslint-disable-line no-unused-vars
    // const user = new User(userInfo.name, userInfo.social, userInfo.image);
    // console.log('getAllUser::::::')

  }

  static getUserByName(name, res) { // eslint-disable-line no-unused-vars
    // const query = { 'name': name };

    // const user = new User(userInfo.name, userInfo.social, userInfo.image);
    // console.log('getUserByName::::::')

  }

  static updateUser(userInfo, res) { // eslint-disable-line no-unused-vars
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    // console.log('user service::::', user);

    // insert: input data count
    // update(query, update, options)
    return MongoDB.update('user', user)
      .then(result => {
        // console.log('user service reached!!', result);

        if (result.modifiedCount > 0) {
          return result;
        }
        throw new Error('result count less then 0');
      })
      .catch(err => {throw err});
  }

  static deleteUser(userInfo, res) { // eslint-disable-line no-unused-vars
    // console.log('deleteUser::::::');
  }

}
