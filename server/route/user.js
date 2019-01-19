import { Router } from 'express';
import UserController from '../controller/user';
import validateRequest from '../middleware/signupValidation';

const router = Router();

router.post('/', validateRequest, UserController.create);
router.post('/signin', UserController.signin);

export default router;
