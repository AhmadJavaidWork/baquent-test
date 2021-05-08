import { Router } from 'express';
import { getPrice } from './controller';

const router = new Router();

router.get('/price', getPrice);

export default router;
