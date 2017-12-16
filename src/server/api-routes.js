import express from 'express';
// import Controller from './controllers/controller';
import UserController from './controllers/user-controller';
import RoomController from './controllers/room-controller';
// import BookController from './controllers/book-controller';
// import SellController from './controllers/sell-controller';

const router = express.Router();
// router.get('/', Controller.get);

// user
router.get('/users', UserController.get);
router.post('/users', UserController.post);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.put);
router.delete('/users/:id', UserController.delete);

// room
router.get('/rooms', RoomController.get);
router.post('/rooms', RoomController.post);
router.get('/rooms/:id', RoomController.getById);
router.put('/rooms/:id', RoomController.put);
router.delete('/rooms/:id', RoomController.delete);

// // book
// router.get('/book', BookController.get);
// router.post('/book', BookController.post);
// router.get('/book/:id', BookController.getById);
// router.put('/book/:id', BookController.put);
// router.delete('/book/:id', BookController.delete);

// // sell
// router.get('/sell', SellController.get);
// router.post('/sell', SellController.post);
// router.get('/sell/:id', SellController.getById);
// router.put('/sell/:id', SellController.put);
// router.delete('/sell/:id', SellController.delete);


export default router;