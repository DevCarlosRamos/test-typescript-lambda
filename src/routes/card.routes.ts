import { api, charges, tokens } from '../controllers/card.controllers';
import {Router} from 'express';

const router = Router();

router.get('/',api);
router.post('/tokens',tokens);
router.post('/charges',charges);

export default router;