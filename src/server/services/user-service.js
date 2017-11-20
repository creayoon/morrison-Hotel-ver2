import User from '../models/user';
import {MongoDB} from '../database/mongo';

export default class UserService {
	static addUser(userInfo, res) {
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    
    console.log('user service::::', user);

    MongoDB.insert('user', user)
    .then(count => {
      if (count > 0) {
        res.send(200, user);
        // cb();
        return;
      }
      res.send(500, 'data is not saved');
      // cb();
    }).catch(err => {
      // cb(err);
      throw err
    });
	}
}
