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
console.log("ewrqweq")
    // res.send({ data });
		UserService.getAllUser()
				.then(result =>{
					res.send(200, result);
					cb();
				})
				.catch(err => {
					if (process.env.NODE_ENV === 'development')
						res.send(500, err);
					else 
						res.send(500, '삭제도중 오류가 발생하였습니다');
					cb();
				})
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
          cb(err);
        });
  }

  // get by name
  static getById(req, res, cb) {
    const { id } = req.params;
    console.log('id:::::', id);
    const essentialFields = ['id'];

    UserController.validCheck(essentialFields, {id})
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
    const essentialFields = Object.keys(body);
    // console.log('essentialFields:::', essentialFields);

    const idchk = essentialFields.indexOf('id');
    console.log('idchk::', idchk);

    // id error case
    if (idchk == -1) {
      return new Error('Need id for updating your personal data');
    } 
    if (idchk >= 2) {
      return new Error('Need only one id for updating your personal data');
    }
    
    UserController.validCheck(essentialFields, body)
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
    // const { body } = req;
    const { id } = req.params;
    console.log('id:::::', id);
    const essentialFields = ['id'];

    UserController.validCheck(essentialFields, {id})
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
            console.log('fieldName:::', fieldName)
            console.log('body:::', body)

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
