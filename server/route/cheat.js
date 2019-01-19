import { Router } from 'express';
import cheatController from '../controller/cheat';

const router = Router();

router.post('/favorite', cheatController.addFavoriteCheat);
router.get('/favorite', cheatController.getFavoriteCheats);
router.get('/', cheatController.getCommands);
router.post('/', cheatController.create);

export default router;
