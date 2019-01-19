import { Router } from 'express';
import categoryController from '../controller/category';

const router = Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getCommands);

export default router;
