import RoomService from '../services/room-service';


// error define
class RoomError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default class RoomController {
  // get all
  static get(req, res, cb) {
    RoomService.getAllRoom()
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
    const essentialFields = ['id'];

    RoomController.validCheck(essentialFields, { id })
      .then(isValid => {
        if (!isValid) throw new RoomError('Need essential argument');
        return RoomService.getRoom(id);
      })
      .then(addRoomResult => {
        res.send(200, addRoomResult);
        cb(); // resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof RoomError) {
          res.send(400, 'Need essential argument');
          cb();
          return;
        }
        cb(err);
      });
  }

  // post
  static post(req, res, cb) {
    const { body } = req;
    const essentialString = ['roomType', 'roomSize', 'bedSize', 'blueprint', 'roomName'];
    // const essentialNumber = ['defaultPrice', 'roomNumber', 'availableGuest', 'acceptChild'];
    // const essentialArray = ['facility', 'image'];

    RoomController.validCheck(essentialString, body, essentialNumber, essentialArray)
      .then(isValid => {
        if (!isValid) throw new RoomError('Need essential argument');
        return RoomService.addRoom(body);
      })
      .then(addRoomResult => {
        res.send(200, addRoomResult);
        cb(); // resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof RoomError) {
          res.send(400, 'Need essential argument');
          cb();
          return;
        }
        cb(err);
      });
  }

  // put: input type check, find room by id, update room info
  static put(req, res, cb) {
    const { body } = req;
    const essentialFields = Object.keys(body);
    // console.log('essentialFields:::', essentialFields);
    const idchk = essentialFields.indexOf('id');
    // console.log('idchk::', idchk);

    // id error case
    if (idchk === -1) {
      return new Error('Need id for updating your personal data');
    }
    if (idchk >= 2) {
      return new Error('Need only one id for updating your personal data');
    }

    RoomController.validCheck(essentialFields, body)
      .then(isValid => {
        if (!isValid) throw new RoomError('Need essential argument');
        return RoomService.updateRoom(body, res);
      })
      .then(addRoomResult => {
        res.send(200, addRoomResult);
        cb(); // resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof RoomError) {
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
    // console.log('id:::::', id);
    const essentialFields = ['id'];

    RoomController.validCheck(essentialFields, { id })
      .then(isValid => {
        if (!isValid) throw new RoomError('Need essential argument');
        return RoomService.deleteRoom(id, res);
      })
      .then(addRoomResult => {
        res.send(200, addRoomResult);
        cb(); // resolve(res) 아니고 cb()
      })
      .catch(err => {
        if (err instanceof RoomError) {
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

  // room model valid check of every single field
  static validCheck(essentialString, body, essentialNumber, essentialArray) {
    // const essentialFields;

    // // call validchk method of each field
    // if (essentialString !== undefined) {
    //   RoomController.validString(essentialString, body)
    //   .then(res => {
    //     if (res === true) 
    //       essentialFields.push(res);
    //     else
    //       throw new Error('string field is not valid');
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     throw err;
    //   })
    // }

    // if (essentialNumber !== undefined) {
    //   RoomController.validNumber(essentialString, body).then(res => {
    //     essentialFields.push(res);
    //   });
    // }

    // if (essentialArray !== undefined) {
    //   RoomController.validObject(essentialString, body).then(res => {
    //     essentialFields.push(res);
    //   });
    // }

    // console.log(essentialFields);
    
    // temp
    let essentialFields = essentialString;
    // final valid chk of each type
    return new Promise((resolve, reject) => {
      essentialFields.map(fieldName => {
        console.log('fieldName:::', fieldName);
        console.log('body:::', body);

        if (!body.hasOwnProperty(fieldName)) return false;
        if (typeof body[fieldName] !== 'string') return false;
        return true;
      })
        .reduce((a, b) => a & b);
    
      //   essentialFields.reduce((a, b) => a & b);
      if (!isValid) {
        reject(new Error('is not valid:::::::'));
      } else {
        resolve(isValid);
      }
    });
  }

//   static validString(essentialString, body) {
//     // string
//     return new Promise((resolve, reject) => {
//       essentialString.map(fieldName => {
//         console.log('fieldName:::', fieldName);
//         console.log('body:::', body);

//         if (!body.hasOwnProperty(fieldName)) return false;
//         if (typeof body[fieldName] !== 'string') return false;
//         return true;
//       })
//         .reduce((a, b) => a & b);
//       if (!isValid) {
//         reject(new Error('is not valid:::::::'));
//       } else {
//         resolve(isValid);
//       }
//     });
//   }

//   static validNumber(essentialNumber, body) {
//     // string
//     return new Promise((resolve, reject) => {
//       essentialNumber.map(fieldName => {
//         console.log('fieldName:::', fieldName);
//         console.log('body:::', body);

//         if (!body.hasOwnProperty(fieldName)) return false;
//         if (typeof body[fieldName] !== 'number') return false;
//         return true;
//       })
//         .reduce((a, b) => a & b);
//       if (!isValid) {
//         reject(new Error('is not valid:::::::'));
//       } else {
//         resolve(isValid);
//       }
//     });
//   }

//   static validObject(essentialArray, body) {
//     // string
//     return new Promise((resolve, reject) => {
//       essentialArray.map(fieldName => {
//         console.log('fieldName:::', fieldName);
//         console.log('body:::', body);

//         if (!body.hasOwnProperty(fieldName)) return false;
//         if (typeof body[fieldName] !== 'object') return false;
//         return true;
//       })
//         .reduce((a, b) => a & b);
//       if (!isValid) {
//         reject(new Error('is not valid:::::::'));
//       } else {
//         resolve(isValid);
//       }
//     });
//   }

}