import User from '../models/user';
import { MongoDB } from '../database/mongo';

export default class UserService {

	static addUser(userInfo, res) {
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    // console.log('user service::::', user);

    // insert: input data count 
    MongoDB.insert('user', user)
    .then(count => {
      if (count > 0) {
        res.send(200, user);
        return;
      }
      res.send(500, 'data is not saved');
    }).catch(err => {
      throw err
    });

    // update
    MongoDB.update('user', user)
    .then(count => {
      if (count > 0) {
        res.send(200, user);
        return;
      }
      res.send(500, 'data is not saved');
    }).catch(err => {
      throw err
    });
  }
  
  static getUser(userInfo, res) {
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    
  }

  static getAllUser(userInfo, res) {
    // const user = new User(userInfo.name, userInfo.social, userInfo.image);
    console.log('getAllUser::::::')
    
  }

  static getUserByName(userInfo, res) {
    // const user = new User(userInfo.name, userInfo.social, userInfo.image);
    console.log('getUserByName::::::')
    
  }

	static updateUser(userInfo, res) {
    console.log('updateUser::::::')

  }

  static deleteUser(userInfo, res) {
    console.log('deleteUser::::::')
    
  }
  



}
