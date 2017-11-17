import express from 'express';
import Controller from './controllers/controller';
import UserController from './controllers/user-controller';
import RoomController from './controllers/room-controller';
const router = express.Router();

router.get('/', Controller.get);
router.delete('/clear', Controller.clear);

// first model
// router.get('/users', UserController.get);
// router.get('/users/:id', UserController.getById);
// router.post('/users', UserController.post);
// router.put('/users', UserController.put);
// router.delete('/users', UserController.delete);

// user
router.post('/users', UserController.post);
router.get('/users/:id', UserController.getById); // id없이 user 관련 가져올 data가 있나..? list말고는..?
router.put('/users/:id', UserController.put);
router.delete('/users/:id', UserController.delete);
router.get('/userlist', UserController.userlist);
router.get('/username/:username', UserController.username);
// user clear 따로 필요한가?

// room
router.post('/users', RoomController.post);
router.get('/users/:id', RoomController.getById);
router.put('/users/:id', RoomController.put);
router.delete('/users/:id', RoomController.delete);
router.get('/roomlist', RoomController.roomlist);
router.get('/roomname/:roomname', RoomController.roomname);
// room clear 따로 필요한가?


export default router;
