import express from 'express';

const router = express.Router();

//certamente elas farão alguma coisa, uma vez que estão aqui, como middleware
//para essas rotass
import { register, login, updateUser } from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);

export default router;