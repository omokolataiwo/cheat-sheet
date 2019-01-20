import { Router } from 'express';
import cheatController from '../controller/cheat';

const router = Router();

router.post('/favorite', cheatController.addFavoriteCheat);
router.get('/favorite', cheatController.getFavoriteCheats);
router.post('/', cheatController.create);

export default router;
