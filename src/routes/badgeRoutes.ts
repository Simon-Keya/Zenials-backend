import express from 'express';
import { checkBadgeEligibility } from '../controllers/badgeController';

const router = express.Router();

router.get('/:userId/eligibility', checkBadgeEligibility);

export default router;
