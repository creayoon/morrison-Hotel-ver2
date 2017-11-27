import UserService from '../services/user-service';

class UserError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default class UserController {
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
		// refactoring 후 에러나는 코드
		// 에러메시지: UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): TypeError: Cannot read property 'validCheck' of undefined

		const { body } = req;

		// valid check
    UserController.validCheck(body)
      .then(isValid => {
        if (!isValid) throw new UserError('Need essential argument');
        return UserService.addUser(body, res)
      })
      .then(addUserResult => {
        res.send(200, addUserResult);
        cb(); // 여기도 resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof UserError ) {
          res.send(400, 'Need essential argument');
          cb(); // 습관적으로 reject() 쓰지말자
          return;
        }
        cb(err);
      });
    
		// used to
		// const { body } = req;
		// return new Promise((resolve, reject) => {

		// 	// valid check
		// 	const essentialFields = ['name', 'social', 'image'];
		// 	const isValid = essentialFields
		// 		.map(fieldName => {
		// 			if (!body.hasOwnProperty(fieldName)) return false;
		// 			if (typeof body[fieldName] !== 'string') return false;
		// 			return true;
		// 		})
		// 		.reduce((a, b) => a & b)

		// 	if (!isValid) {
		// 		res.send(400, 'Need essential argument');
		// 		reject(err); // 이렇게 써도 되는지 확인
		// 	} else {
		// 		res.send(200, body);
		// 		resolve(res);
		// 	}
		// }).then(postRes => {
		// 	// console.log('postRes::::', postRes);
		// 	if (postRes.statusCode === 200) {
		// 		// console.log('postRes.statusCode::::', postRes.statusCode);
		// 		UserService.addUser(body, res);
		// 	}

		// 	cb(); // 여기서 cb() 맞지?
		// })
	}

	static getByName(req, res, cb) {
    const { id } = req.query;
    
    UserService.getUser(id)

		res.send({ id });
		cb();
	}

	// put: input type check, find user by id, update user info
	static put(req, res, cb) {
		const { body } = req;
		let id = req.params.id;
		console.log('id:::::::', id);

		return new Promise((resolve, reject) => {
			// type check
			UserController.typeCheck(body).then(isType => {
				if (!isType) {
					res.send(400, 'Wrong type argument');
					reject(err);
				} else {
					res.status(200).send(body);
					resolve(res);
				}
			})
		}).then(putRes => {
			console.log('putRes::::', putRes);
			if (putRes.statusCode === 200) {
				// console.log('putRes.statusCode::::', putRes.statusCode);
				UserService.updateUser(body, res);
			}
		})
	}

	static delete(req, res) {
		const { data } = req.query;

		res.send({ data });
		cb();
	}

	// user model valid check
	static validCheck(body) {
		console.log('validCheck body:::', body)

		return new Promise((resolve, reject) => {
			console.log(11111)
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
	static typeCheck(body) {

		return new Promise((resolve, reject) => {
			const fieldName = Object.keys(body);

			if (!body.hasOwnProperty(fieldName)) return false;
			if (body.hasOwnProperty(fieldName) != 'string') return false;
			return true;
		})
			.reduce((a, b) => a & b)
		if (isValid) {
			resolve(isValid)
		}

	}
}
