import { Router } from 'express';
import service from './service';

const router = new Router();

router.use('/service', service);

export default router;
