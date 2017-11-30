import UserService from '../services/user-service';

class UserError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default class UserController {

  // get
	static get(req, res, cb) {
		const { data } = req.query;

		if (type === 'list')
			UserService.getAllUser();
		else if (type === 'name')
			UserService.getUserByName(name);

	  res.send({ data });
		cb();
	}

	// post: input data validation chk (누락된 정보가 없도록 모든 필드 확인)
	static post(req, res, cb) {
		const { body } = req;

		// valid check
    UserController.validCheck(body)
      .then(isValid => {
        if (!isValid) throw new UserError('Need essential argument');
        return UserService.addUser(body, res)
      })
      .then(addUserResult => {
        res.send(200, addUserResult);
        cb(); // resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof UserError ) {
          res.send(400, 'Need essential argument');
          cb();
          return;
        }
        cb(err);
      });
	}

	static getByName(req, res, cb) {
    // Error on request GET /api/users?name=abc
    // ReferenceError: type is not defined
    
    // console.log('getByname req:::::', req);
    console.log('req.query:::::', req.query)
    
    const { name } = req.query;
    // console.log('name:::::', name)

    // name 인자가 string이 맞는지 체크하는 코드 추가
    UserService.getUser(name);

    // console.log(res.body)
		// res.send({ name });
		cb();
	}

  // put: input type check, find user by id, update user info
  // http://localhost:5000/api/users/abc
	static put(req, res, cb) {    
		const { body } = req;
    // const { url } = req;
    // const api = url.split('/')[1]; // /users/abc 
    // let length = api.length;
    // // make api singular
    // let collection = api.substr(0, length-1);

		// console.log('body:::::::', body, url, api, length, collection);
    
      // input 받은 key들을 배열로 정리
      // let keys = Object.keys(body);

      // keys.forEach(element => {
      //   let value = body[element];
      //   console.log('ele::', element, value);
      // });


    UserController.validCheck(body)
    .then(isValid => {
      if (!isValid) throw new UserError('Need essential argument');
      // return UserService.addUser(body, res)
      return UserService.updateUser(body, res)
    })
    .then(addUserResult => {
      res.send(200, addUserResult);
      cb(); // resolve(res) 아니고 cb()
    })
    .catch(err => {
      if (err instanceof UserError ) {
        res.send(400, 'Need essential argument');
        cb();
        return;
      }
      cb(err);
    });
    
			// type check
		// 	UserController.inputCheck(body).then(isType => {
    //     console.log('isType:::', isType)
        
    //     if (!isType) {
		// 			res.send(400, 'Wrong type argument');
		// 			reject(err);
		// 		} else {
		// 			res.status(200).send(body);
		// 			resolve(res);
		// 		}
		// 	})
    // })
    // .then(putRes => {
    //   console.log('putRes::::', putRes);
    //   if (putRes.statusCode === 200) {
    //     // console.log('putRes.statusCode::::', putRes.statusCode);
    //     UserService.updateUser(body, res);
    //   }
    // })
    // .catch(e => console.log('Err:::', e));
	}

	static delete(req, res) {
		const { body } = req;

		UserController.validCheck(body)
    .then(isValid => {
      if (!isValid) throw new UserError('Need essential argument');
      // return UserService.addUser(body, res)
      return UserService.deleteUser(body, res)
    })
    .then(addUserResult => {
      res.send(200, addUserResult);
      cb(); // resolve(res) 아니고 cb()
    })
    .catch(err => {
      if (err instanceof UserError ) {
        res.send(400, 'Need essential argument');
        cb();
        return;
      }
      cb(err);
    });
	}

	// user model valid check: 모든 filed가 필요한 경우
	static validCheck(body) {
		console.log('validCheck body:::', body)

		return new Promise((resolve, reject) => {
			const essentialFields = ['name', 'social', 'image'];
			const isValid = essentialFields
				.map(fieldName => {
					console.log('fieldName:::', fieldName)
					if (!body.hasOwnProperty(fieldName)) return false;
					if (typeof body[fieldName] !== 'string') return false;
					return true;
				})
				.reduce((a, b) => a & b)

			if (!isValid) {
				console.log('is not valid:::::::')
				reject(new Error('is not valid:::::::'));
			} else {
				console.log('is valid:::::::')
				resolve(isValid)
			}
			// 여기서 reject 할 필요 있나??
		})
	}

	// input data type chk for update or delete
	// static inputCheck(body) {
  //   console.log('inputCheck::::')

	// 	return new Promise((resolve, reject) => {
  //     console.log('inputCheck Promise::::')
    
  //     // 모든 key값은 front에서 넘어오도록 처리할 예정
  //     const fieldName = Object.keys(body); 

  //     // key의 갯수로 collection을 파악하도록 함
  //     // key의 갯수가 3이면 user collection, 10이면 rooms collection, 나머지는 나중에 추가
  //     // user collection일 경우, 전부 string이 맞는지 확인
  //     if (fieldName.length === 3) {
  //       if (!body.hasOwnProperty(fieldName)) return false;
  //       if (body.hasOwnProperty(fieldName) != 'string') return false;
  //       return true;
  //     }
      
  //     if (fieldName.length === 10) {
  //       if (!body.hasOwnProperty(fieldName)) return false;
  //       if (body.hasOwnProperty(fieldName) != 'string') return false;
  //       if (body.hasOwnProperty(fieldName) != 'string') return false;
  //       return true;
  //     }

			
  //   })
  //   .then(isValid => {
  //     if (isValid) {
  //       resolve(isValid)
  //     } 
  //   })
  //   .catch(e => console.log('Err:::', e));
		

	// }
}
