import { Request, Response } from 'express';
import { Upload } from '../models/uploadModel';

export const createUpload = async (req: Request, res: Response): Promise<void> => {
  const { userId, type, url } = req.body;

  try {
    // Save the upload to the database
    const newUpload = await Upload.create({ userId, type, url });
    res.status(201).json({ message: 'Upload successful!', upload: newUpload });
  } catch (error: any) {  // Explicitly typing the error as 'any'
    res.status(500).json({ message: 'Error creating upload.', error: error.message });
  }
};

export const getUserUploads = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const uploads = await Upload.findAll({ where: { userId } });
    res.status(200).json({ uploads });
  } catch (error: any) {  // Explicitly typing the error as 'any'
    res.status(500).json({ message: 'Error fetching uploads.', error: error.message });
  }
};
