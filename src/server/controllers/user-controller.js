import UserService from '../services/user-service';


// error define
class UserError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default class UserController {
  // get all
  static get(req, res, cb) {
    UserService.getAllUser()
      .then(result => {
        res.send(200, result);
        cb();
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development')
          res.send(500, err);
        else
          res.send(500, '삭제도중 오류가 발생하였습니다');
        cb();
      });
  }

  // get by id
  static getById(req, res, cb) {
    const { id } = req.params;
    // console.log('id:::::', id);
    const essentialFields = ['id'];

    UserController.validCheck(essentialFields, { id })
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
        // cb(err);
        // return false; // 여기 아니래, 왜?? consistent-return 잘 모르겠다..
      });
  }

  // post
  static post(req, res, cb) {
    const { body } = req;
    const essentialFields = ['id', 'name', 'social', 'image'];

    UserController.validCheck(essentialFields, body)
      .then(isValid => {
        if (!isValid) throw new UserError('Need essential argument');
        return UserService.addUser(body);
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
        // cb(err);
        // cb();
        // return false;
      });
  }

  // put: input type check, find user by id, update user info
  static put(req, res, cb) {
    const { id } = req.params;
    const { body } = req;
    const essentialFields = Object.keys(body);

    // id error case
    if (id === -1) {
      return new Error('Need id for updating your personal data');
    }
    if (id >= 2) {
      return new Error('Need only one id for updating your personal data');
    }

    UserController.validCheck(essentialFields, id)
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
        // cb(err);
        // cb();
        // return false;
      });
    return true;
  }

  // delete
  static delete(req, res, cb) {
    // const { body } = req;
    const { id } = req.params;
    // console.log('id:::::', id);
    const essentialFields = ['id'];

    UserController.validCheck(essentialFields, { id })
      .then(isValid => {
        if (!isValid) throw new UserError('Need essential argument');
        // return UserService.addUser(body, res)
        return UserService.deleteUser(id, res);
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
        if (process.env.NODE_ENV === 'development')
          res.send(500, err);
        else
          res.send(500, '삭제도중 오류가 발생하였습니다');
        cb();
      });
  }

  // user model valid check of every single field
  static validCheck(essentialFields, body) {
    return new Promise((resolve, reject) => {
      const isValid = essentialFields
        .map(fieldName => {
          // console.log('fieldName:::', fieldName);
          // console.log('body:::', body);

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
