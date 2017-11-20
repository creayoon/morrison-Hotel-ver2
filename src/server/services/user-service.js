import User from '../models/user';
import {MongoDB} from '../database/mongo';

export default class UserService {
	static addUser(userInfo, res, cb) {
    const user = new User(userInfo.name, userInfo.social, userInfo.image);
    
    console.log(MongoDB.insert);

    MongoDB.insert('user', user)
    .then(count => {
      if (count > 0) {
        res.send(user);
        cb();
        return;
      }
      res.status(500).send('data is not saved');
      cb();
    }).catch(err => {
      cb(err);
    });
	}
}
