import Photo from '../models/IMAGE.js';
import fs from 'fs';
import path from 'path';

// Get all photos
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload/Create a photo
export const createPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newPhoto = new Photo({
      image: {
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });

    const saved = await newPhoto.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // Delete file from disk
    fs.unlinkSync(path.resolve(photo.image.filepath));

    await photo.deleteOne();
    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
