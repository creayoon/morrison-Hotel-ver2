import UserService from '../services/user-service';


// error define
class UserError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default class UserController {
  // get
  static get(req, res, cb) {
    // const { data } = req.query;

    // if (type === 'list')
    // 	UserService.getAllUser();
    // else if (type === 'name')
    // 	UserService.getUserByName(name);

    // res.send({ data });
    cb();
  }

  // post
  static post(req, res, cb) {
    const { body } = req;

    UserController.validCheck(body)
        .then(isValid => {
          if (!isValid) throw new UserError('Need essential argument');
          return UserService.addUser(body, res);
        })
        .then(addUserResult => {
          res.send(200, addUserResult);
          cb(); // resolve(res) 아니고 cb()
        })
        .catch(err => {
          if (err instanceof UserError) {
            res.send(400, 'Need essential argument');
            cb();
            return;
          }
          cb(err);
        });
  }

  // get by name
  static getByName(req, res, cb) {
    const { id } = req.query;
    // console.log('name:::::', name)

    UserController.validCheck(id)
        .then(isValid => {
          if (!isValid) throw new UserError('Need essential argument');
          return UserService.getUser(id);
        })
        .then(addUserResult => {
          res.send(200, addUserResult);
          cb(); // resolve(res) 아니고 cb()
        })
        .catch(err => {
          if (err instanceof UserError) {
            res.send(400, 'Need essential argument');
            cb();
            return;
          }
          cb(err);
        });
  }

  // put: input type check, find user by id, update user info
  static put(req, res, cb) {
    const { body } = req;

    UserController.validCheck(body)
        .then(isValid => {
          if (!isValid) throw new UserError('Need essential argument');
          return UserService.updateUser(body, res);
        })
        .then(addUserResult => {
          res.send(200, addUserResult);
          cb(); // resolve(res) 아니고 cb()
        })
        .catch(err => {
          if (err instanceof UserError) {
            res.send(400, 'Need essential argument');
            cb();
            return;
          }
          cb(err);
        });
  }

  // delete
  static delete(req, res, cb) {
    const { body } = req;

    UserController.validCheck(body)
        .then(isValid => {
          if (!isValid) throw new UserError('Need essential argument');
          // return UserService.addUser(body, res)
          return UserService.deleteUser(body, res);
        })
        .then(addUserResult => {
          res.send(200, addUserResult);
          cb(); // resolve(res) 아니고 cb()
        })
        .catch(err => {
          if (err instanceof UserError) {
            res.send(400, 'Need essential argument');
            cb();
            return;
          }
          cb(err);
        });
  }

  // user model valid check of every single field
  static validCheck(body) {
    return new Promise((resolve, reject) => {
      const essentialFields = ['name', 'social', 'image'];
      const isValid = essentialFields
          .map(fieldName => {
            // console.log('fieldName:::', fieldName)
            if (!body.hasOwnProperty(fieldName)) return false;
            if (typeof body[fieldName] !== 'string') return false;
            return true;
          })
          .reduce((a, b) => a & b);
      if (!isValid) {
        reject(new Error('is not valid:::::::'));
      } else {
        resolve(isValid);
      }
    });
  }
}
