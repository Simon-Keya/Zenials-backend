import express from 'express';
import { likeContent, getLikesCount } from '../controllers/likeController';

const router = express.Router();

router.post('/', likeContent);
router.get('/:contentId/count', getLikesCount);

export default router;
