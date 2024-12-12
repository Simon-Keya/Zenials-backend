import { Request, Response } from 'express';
import { Notification } from '../models/notificationModel';

export const createNotification = async (req: Request, res: Response): Promise<void> => {
  const { userId, message } = req.body;

  try {
    const notification = await Notification.create({ userId, message });
    res.status(201).json({ message: 'Notification created successfully!', notification });
  } catch (error:any) {
    res.status(500).json({ message: 'Error creating notification.', error: error.message });
  }
};

export const getUserNotifications = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.status(200).json({ notifications });
  } catch (error:any) {
    res.status(500).json({ message: 'Error fetching notifications.', error: error.message });
  }
};
