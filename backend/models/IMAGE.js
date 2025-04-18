import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  image: {
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number
  }
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;