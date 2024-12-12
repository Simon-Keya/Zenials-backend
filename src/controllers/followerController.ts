import { Request, Response } from 'express';
import { Follower } from '../models/followerModel';

export const followUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, followerId } = req.body;

  try {
    const newFollower = await Follower.create({ userId, followerId });
    res.status(201).json({ message: 'Followed successfully', follower: newFollower });
  } catch (error:any) {
    res.status(500).json({ message: 'Error following user', error: error.message });
  }
};

export const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, followerId } = req.body;

  try {
    await Follower.destroy({
      where: { userId, followerId },
    });
    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error:any) {
    res.status(500).json({ message: 'Error unfollowing user', error: error.message });
  }
};
