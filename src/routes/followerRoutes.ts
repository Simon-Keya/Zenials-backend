import express from 'express';
import { followUser, unfollowUser } from '../controllers/followerController';

const router = express.Router();

router.post('/', followUser);
router.delete('/', unfollowUser);

export default router;
