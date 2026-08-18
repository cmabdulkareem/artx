import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artx';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB (artx)'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const resultSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // event id
  title: { type: String, required: true },
  scores: {
    type: Map,
    of: String, // Keep as String to support empty inputs nicely
    default: {}
  }
});

const Result = mongoose.model('Result', resultSchema);

// Helper to seed initial data if database is empty
async function seedInitialData() {
  const count = await Result.countDocuments();
  if (count === 0) {
    const teams = [
      'CADD CENTRE Ksd',
      'Dreamzone Mng',
      'Dreamzone Ksd',
      'Synergy Ksd',
      'Livewire Ksd',
    ];
    const emptyScores = Object.fromEntries(teams.map(t => [t, '']));
    
    const events = [
      { id: 'speech', title: 'Speech' },
      { id: 'memory-challenge', title: 'Memory Challenge' },
      { id: 'quiz', title: 'Quiz' },
      { id: 'ramp-walk', title: 'Ramp Walk' },
      { id: 'mehendi', title: 'Mehendi' },
      { id: 'musical-chair', title: 'Musical Chair' },
      { id: 'lemon-spoon', title: 'Lemon & Spoon' },
      { id: 'solo-dance', title: 'Single Dance' },
      { id: 'solo-song', title: 'Single Song' },
      { id: 'uno', title: 'UNO' },
      { id: 'face-painting', title: 'Face Painting' },
      { id: 'chess', title: 'Chess' },
      { id: 'group-song', title: 'Group Song' },
      { id: 'group-dance', title: 'Group Dance' },
      { id: 'reel-challenge', title: 'Reel Challenge' },
    ];

    const initialResults = events.map(event => ({
      id: event.id,
      title: event.title,
      scores: { ...emptyScores },
    }));

    await Result.insertMany(initialResults);
    console.log('Seeded initial event results in database.');
  }
}

mongoose.connection.once('open', seedInitialData);

// API Routes
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find({});
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
});

app.post('/api/results/update', async (req, res) => {
  const { eventId, team, value, password } = req.body;

  if (password !== 'artx26coded') {
    return res.status(401).json({ message: 'Unauthorized: Invalid password' });
  }

  try {
    // Find the event
    const result = await Result.findOne({ id: eventId });
    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the score for the team
    result.scores.set(team, value);
    await result.save();

    // Fetch and return all updated results
    const allResults = await Result.find({});
    res.json(allResults);
  } catch (error) {
    res.status(500).json({ message: 'Error updating score', error });
  }
});

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all: serve index.html for any non-API route (React Router SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
