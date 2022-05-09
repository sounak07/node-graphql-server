import { Router } from 'express';
import { loginFlow } from '../../controllers/login';

const router = Router();

router.post('/login', loginFlow);

export default router;
