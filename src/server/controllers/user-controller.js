export default class UserController {
  static get(req, res, cb) {
    const {data} = req.query;

    // res.send({data: data});
    res.send({data});
    cb();
  }

  static getById(req, res, cb) {
    const {id} = req.params;

    res.send({id});
    cb();
  }

  static post(req, res, cb) {
    const {data} = req.query;

    res.send({data});
    cb();
  }

  static put(req, res, cb) {
    const {data} = req.query;

    res.send({data});
    cb();
  }

  static delete(req, res, cb) {
    const {data} = req.query;

    res.send({data});
    cb();
  }

  // 어떻게 해야 하나..
  static clear(req, res, cb) {
    // const {data} = req.query;

    // res.send({data});
    cb();
  }

}
