import { Router } from 'express';

import * as authRouter from './authRoutes';
import * as debitRouter from './debitRoutes';

const router = Router();

router.use('/auth', authRouter.default);
router.use('/debits', debitRouter.default);

export { router as rootRouter };
