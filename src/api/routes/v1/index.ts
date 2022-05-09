import { Router } from 'express';
import { countryFlow } from '../../controllers/country';
import { loginFlow } from '../../controllers/login';

const router = Router();

router.post('/login', loginFlow);
router.get('/country', countryFlow);

export default router;
