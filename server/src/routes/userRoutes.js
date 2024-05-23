import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', UserController.registerUser.bind(UserController));
router.post('/login', UserController.authenticateUser.bind(UserController));

export default router;