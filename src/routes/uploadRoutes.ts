import express from 'express';
import multer from 'multer';
import { createUpload, getUserUploads } from '../controllers/uploadController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), createUpload); // Use 'createUpload' instead of 'uploadContent'
router.get('/:userId', getUserUploads);

export default router;
