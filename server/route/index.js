import { Router } from 'express';
import userRouter from './user';
import categoryRouter from './category';
import cheatRouter from './cheat';
import db from '../controller/db';

const router = Router();
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/cheat', cheatRouter);
router.get('/seed', db.seed);

export default router;
