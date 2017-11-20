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

	static post(req, res, cb) {
		const { body } = req;

		const essentialFields = ['name', 'social', 'image'];
		const isValid = essentialFields
			.map(fieldName => {
				if (!body.hasOwnProperty(fieldName)) return false;
				if (typeof body[fieldName] !== 'string') return false;
				return true;
			})
			.reduce((a, b) => a & b)

		if (!isValid) {
			res.status(400).send('Need essential argument');
			cb();
			return;
		}

		UserService.addUser(body, res, cb);
		
		// res.send(body);
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
