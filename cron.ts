import { CronJob } from 'cron';
import { User } from './src/models/userModel'; // Ensure the path is correct
import { Badge } from './src/models/badgeModel'; // Ensure the path is correct
import { Upload } from './src/models/uploadModel'; // Ensure the path is correct

// Define the Follower model if necessary, or replace with correct model name
import { Follower } from './src/models/followerModel'; // Assuming there's a follower model

const checkBadgesEligibility = new CronJob(
  '0 0 * * *', // Runs once a day at midnight
  async () => {
    try {
      const users = await User.findAll();

      for (const user of users) {
        // Calculate user uploads and followers
        const uploads = await Upload.findAll({ where: { userId: user.id } });
        const followers = await User.findAll({
          include: [
            {
              model: Follower, // Assuming this is the correct model for followers
              where: { userId: user.id },
            },
          ],
        });

        const uploadCounts = uploads.reduce(
          (acc: { video: number; image: number; audio: number }, upload: Upload) => {
            if (upload.type in acc) {
              acc[upload.type]++;
            }
            return acc;
          },
          { video: 0, image: 0, audio: 0 }
        );

        const followerCount = followers.length;

        if (
          uploadCounts.video >= 100 &&
          uploadCounts.image >= 50 &&
          uploadCounts.audio >= 50 &&
          followerCount >= 10000
        ) {
          const badge = await Badge.create({
            userId: user.id,
            badgeType: 'contentCreator',
            earnedAt: new Date(),
          });
          console.log(`User ${user.id} earned a badge!`);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error checking badges eligibility:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  },
  null,
  true,
  'America/Los_Angeles'
);

checkBadgesEligibility.start();
