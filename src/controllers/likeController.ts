import { Request, Response } from 'express';
import { Like } from '../models/likeModel';

export const likeContent = async (req: Request, res: Response): Promise<void> => {
  const { userId, contentId, type } = req.body;

  try {
    const newLike = await Like.create({ userId, contentId, type });
    res.status(201).json({ message: 'Content liked!', like: newLike });
  } catch (error:any) {
    res.status(500).json({ message: 'Error liking content.', error: error.message });
  }
};

export const getLikesCount = async (req: Request, res: Response): Promise<void> => {
  const { contentId } = req.params;

  try {
    const likeCount = await Like.count({ where: { contentId } });
    res.status(200).json({ likeCount });
  } catch (error:any) {
    res.status(500).json({ message: 'Error fetching likes count.', error: error.message });
  }
};
