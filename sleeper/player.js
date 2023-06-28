import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  id: String,
  name: String
});

const Player = mongoose.model('Player', playerSchema);

export default Player;