import express from 'express';
import Controller from './controllers/controller';
import UserController from './controllers/user-controller';
const router = express.Router();

router.get('/', Controller.get);
router.get('/users', UserController.get);
router.get('/users/:id', UserController.getById);

export default router;
