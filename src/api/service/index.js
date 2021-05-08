import { Router } from 'express';
import { getPrice, apiCall } from './controller';

const router = new Router();

router.get('/price', apiCall, getPrice);

export default router;
