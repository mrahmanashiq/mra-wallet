import { Router } from 'express';
import * as debitController from '../controllers/debitController';

const router = Router();

router.get('/', debitController.getDebits);
router.get('/:id', debitController.getDebit);
router.post('/', debitController.createDebit);
router.put('/:id', debitController.updateDebit);
router.delete('/:id', debitController.deleteDebit);

export default router;