import { Router } from 'express';
import UserController from '../controller/user';

const router = Router();

router.post('/', UserController.create);
router.post('/signin', UserController.signin);

export default router;
