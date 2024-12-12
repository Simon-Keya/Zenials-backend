import { Request, Response } from 'express';
import { Monetization } from '../models/monetizationModel';
import { Like } from '../models/likeModel';

export const setContentPrice = async (req: Request, res: Response): Promise<void> => {
  const { userId, contentId, price } = req.body;

  try {
    const monetization = await Monetization.create({
      userId,
      contentId,
      price,
      earned: 0,
    });

    res.status(201).json({ message: 'Content price set successfully!', monetization });
  } catch (error:any) {
    res.status(500).json({ message: 'Error setting content price.', error: error.message });
  }
};

export const updateEarnings = async (): Promise<void> => {
  try {
    const monetizations = await Monetization.findAll();

    for (const monetization of monetizations) {
      const likes = await Like.count({ where: { contentId: monetization.contentId } });

      const earnings = monetization.price * likes; // Earnings are calculated based on likes
      monetization.earned += earnings;
      await monetization.save();
    }

    console.log('Earnings updated successfully.');
  } catch (error:any) {
    console.error('Error updating earnings:', error.message);
  }
};
