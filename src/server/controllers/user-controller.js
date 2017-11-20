import UserService from '../services/user-service';

export default class UserController {
	static get(req, res, cb) {
		const {data} = req.query;
		
		if (type === 'list')
		UserService.getAllUser();

		else if (type === 'name')
		UserService.getUserByName(name);

	  res.send({data});
	  cb();
	}

	static post(req, res) {
		const { body } = req;
		
		return new Promise((resolve, reject) => {
			const essentialFields = ['name', 'social', 'image'];
			const isValid = essentialFields
				.map(fieldName => {
					if (!body.hasOwnProperty(fieldName)) return false;
					if (typeof body[fieldName] !== 'string') return false;
					return true;
				})
				.reduce((a, b) => a & b)

			if (!isValid) {
				// res.status(400).send('Need essential argument'); // deprecated
				res.send(400, 'Need essential argument');
				reject(err); // 이렇게 써도 되는지 확인
				// return;
			} else {
				res.send(200, body);
				resolve(res);
			}
		}).then(postRes => {
			console.log('postRes::::', postRes);

			if (postRes.statusCode === 200) {
				console.log('postRes.statusCode::::', postRes.statusCode);
			
				UserService.addUser(body, res);
			}
		})
		
		
		// cb();
	}

	static getById(req, res, cb) {
		const { id } = req.params;

		res.send({ id });
		cb();
	}

	static put(req, res, cb) {
		const { data } = req.query;

		res.send({ data });
		cb();
	}

	static delete(req, res, cb) {
		const { data } = req.query;

		res.send({ data });
		cb();
	}

}
