import { Router } from 'express';

import * as authRouter from './authRoutes';

const router = Router();

router.use('/auth', authRouter.default);

export { router as rootRouter };
