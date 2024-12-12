import { Request, Response } from 'express';
import { Badge } from '../models/badgeModel';
import { User } from '../models/userModel';
import { Upload } from '../models/uploadModel';  // Ensure Upload is imported correctly

export const checkBadgeEligibility = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    // Find the user and include their uploads
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Upload,  // Including the Upload model
        where: { userId },  // Filtering the uploads by userId
        required: true,  // Ensures the user has uploads
      },
    });

    if (!user || !user.uploads || user.uploads.length === 0) {
      res.status(400).json({ message: 'User has no uploads.' });
      return;
    }

    // Count the number of different types of uploads
    const uploadCounts = user.uploads.reduce(
      (acc: { video: number; image: number; audio: number }, upload: { type: string }) => {
        if (upload.type === 'video') acc.video++;
        if (upload.type === 'image') acc.image++;
        if (upload.type === 'audio') acc.audio++;
        return acc;
      },
      { video: 0, image: 0, audio: 0 }
    );

    // Check if the user qualifies for a badge
    if (
      uploadCounts.video >= 100 &&
      uploadCounts.image >= 50 &&
      uploadCounts.audio >= 50
    ) {
      const badge = await Badge.create({
        userId,
        badgeType: 'contentCreator',
        earnedAt: new Date(),
      });

      res.status(200).json({
        message: 'Badge earned!',
        badge,
      });
      return;
    }

    res.status(400).json({ message: 'User does not qualify for a badge yet.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error checking badge eligibility.', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.', error: String(error) });
    }
  }
};
