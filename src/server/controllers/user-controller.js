import { UserService } from '../services/user-service';

export default class UserController {
	static get(req, res) {
		const {data} = req.query;
		
		if (type === 'list')
		UserService.getAllUser();

		else if (type === 'name')
		UserService.getUserByName(name);

	  res.send({data});
	  cb();
	}

	// post: input data validation chk (누락된 정보가 없도록 모든 필드 확인)
	static post(req, res) {
		// refactoring 후 에러나는 코드
		// 에러메시지: UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): TypeError: Cannot read property 'validCheck' of undefined

		// const { body } = req;

		// return new Promise((resolve, reject) => {
		// 	// valid check
		// 	console.log('body::::::', body)
		// 	this.validCheck(body)
		// 	.then(isValid => {
		// 		console.log('isValid::::::', isValid)
			
		// 		if (!isValid) {
		// 			res.send(400, 'Need essential argument');
		// 			// reject(err); // 이렇게 써도 되는지 확인, 안되는듯, 여기서 UnhandledPromiseRejectionWarning: Unhandled promise rejection 뜨는거 같애, 그럼 reject은 어디서 해주나?
		// 		} else {
		// 			res.send(200, body);
		// 			resolve(res);
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log("Promise Rejected", err);
	 	// 	});
		// })
		// .then(postRes => {
		// 	console.log('postRes::::', postRes);
		// 	if (postRes.statusCode === 200) {
		// 		// console.log('postRes.statusCode::::', postRes.statusCode);
		// 		UserService.addUser(body, res);
		// 	}
		// })
		// .catch((error) => {
		// 	throw error;
		// });

		// used to
		const { body } = req;
		return new Promise((resolve, reject) => {

			// valid check
			const essentialFields = ['name', 'social', 'image'];
			const isValid = essentialFields
				.map(fieldName => {
					if (!body.hasOwnProperty(fieldName)) return false;
					if (typeof body[fieldName] !== 'string') return false;
					return true;
				})
				.reduce((a, b) => a & b)

			if (!isValid) {
				res.send(400, 'Need essential argument');
				reject(err); // 이렇게 써도 되는지 확인
			} else {
				res.send(200, body);
				resolve(res);
			}
		}).then(postRes => {
			// console.log('postRes::::', postRes);
			if (postRes.statusCode === 200) {
				// console.log('postRes.statusCode::::', postRes.statusCode);
				UserService.addUser(body, res);
			}
		})
	}

	static getById(req, res) {
		const { id } = req.params;

		res.send({ id });
		cb();
	}

	// put: input type check, find user by id, update user info
	static put(req, res) {
		const { body } = req;
		let id = req.params.id;
		console.log('id:::::::', id);
		
		return new Promise((resolve, reject) => {
			// type check
			this.typeCheck(body).then(isType => {
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
				reject(err);
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
		.reduce((a,b) => a & b)	
		if (isValid) {
			resolve(isValid)
		}
		
	}
}
