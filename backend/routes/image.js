import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getAllPhotos, createPhoto, deletePhoto } from '../Controller/imageController.js';

const router = express.Router();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create folder if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads', 'logo', 'photos');
fs.mkdirSync(uploadDir, { recursive: true });

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', getAllPhotos);
router.post('/upload', upload.single('image'), createPhoto);
router.delete('/:id', deletePhoto);

export default router;
