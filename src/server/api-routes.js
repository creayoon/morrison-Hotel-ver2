import express from 'express';
import Controller from './controllers/controller';
import UserController from './controllers/user-controller';
import RoomController from './controllers/room-controller';
const router = express.Router();

router.get('/', Controller.get);

// user
router.get('/users', UserController.get);
router.post('/users', UserController.post);
router.get('/users/:id', UserController.getByName);
router.put('/users/:id', UserController.put);
router.delete('/users/:id', UserController.delete);

// room
router.get('/rooms', RoomController.get);
router.post('/rooms', RoomController.post);
router.get('/rooms/:id', RoomController.getById);
router.put('/rooms/:id', RoomController.put);
router.delete('/rooms/:id', RoomController.delete);


export default router;
