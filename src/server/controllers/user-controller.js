export default class UserController {
  static get(req, res, cb) {
    const {data} = req.query;

    // res.send({data: data});
    res.send({data});
    cb();
  }

  static getById(req, res, cb) {
    const {id} = req.params;

    // res.send({data: data});
    res.send({id});
    cb();
  }

}
