export default class RoomController {
  static get(req, res, cb) {
	const { data } = req.query;

	res.send({ data });
	cb();
  }

  static post(req, res, cb) {
	const { data } = req.query;

	res.send({ data });
	cb();
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
