import express from 'express';
import Controller from './controllers/controller';
import UserController from './controllers/user-controller';
const router = express.Router();

router.get('/', Controller.get);
router.get('/users', UserController.get);
router.get('/users/:id', UserController.getById);

router.post('/users', UserController.post);
router.put('/users', UserController.put);
router.delete('/users', UserController.delete);

router.delete('/clear', UserController.clear);


export default router;