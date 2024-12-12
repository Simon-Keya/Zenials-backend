import express from 'express';
import { setContentPrice } from '../controllers/monetizationController';

const router = express.Router();

router.post('/', setContentPrice);

export default router;
