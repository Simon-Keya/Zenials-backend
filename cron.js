"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const userModel_1 = require("./src/models/userModel"); // Ensure the path is correct
const badgeModel_1 = require("./src/models/badgeModel"); // Ensure the path is correct
const uploadModel_1 = require("./src/models/uploadModel"); // Ensure the path is correct
// Define the Follower model if necessary, or replace with correct model name
const followerModel_1 = require("./src/models/followerModel"); // Assuming there's a follower model
const checkBadgesEligibility = new cron_1.CronJob('0 0 * * *', // Runs once a day at midnight
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.findAll();
        for (const user of users) {
            // Calculate user uploads and followers
            const uploads = yield uploadModel_1.Upload.findAll({ where: { userId: user.id } });
            const followers = yield userModel_1.User.findAll({
                include: [
                    {
                        model: followerModel_1.Follower, // Assuming this is the correct model for followers
                        where: { userId: user.id },
                    },
                ],
            });
            const uploadCounts = uploads.reduce((acc, upload) => {
                if (upload.type in acc) {
                    acc[upload.type]++;
                }
                return acc;
            }, { video: 0, image: 0, audio: 0 });
            const followerCount = followers.length;
            if (uploadCounts.video >= 100 &&
                uploadCounts.image >= 50 &&
                uploadCounts.audio >= 50 &&
                followerCount >= 10000) {
                const badge = yield badgeModel_1.Badge.create({
                    userId: user.id,
                    badgeType: 'contentCreator',
                    earnedAt: new Date(),
                });
                console.log(`User ${user.id} earned a badge!`);
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error checking badges eligibility:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
    }
}), null, true, 'America/Los_Angeles');
checkBadgesEligibility.start();
