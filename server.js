import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://artx.cdcinternational.in'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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

const quizStateSchema = new mongoose.Schema({
  key: { type: String, default: 'active_state', unique: true },
  currentRoundIndex: { type: Number, default: 0 },
  currentQuestionIndex: { type: Number, default: -1 },
  showAnswer: { type: Boolean, default: false },
  announcedWinner: { type: String, default: '' }
});

const QuizState = mongoose.model('QuizState', quizStateSchema);

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

  const quizStateCount = await QuizState.countDocuments();
  if (quizStateCount === 0) {
    await QuizState.create({ key: 'active_state' });
    console.log('Seeded default quiz state in database.');
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

  if (password !== '5626') {
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

// Quiz State API Routes
app.get('/api/quiz-state', async (req, res) => {
  try {
    let state = await QuizState.findOne({ key: 'active_state' });
    if (!state) {
      state = await QuizState.create({ key: 'active_state' });
    }
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz state', error });
  }
});

app.post('/api/quiz-state/update', async (req, res) => {
  const { currentRoundIndex, currentQuestionIndex, showAnswer, announcedWinner, password } = req.body;

  if (password !== '5626') {
    return res.status(401).json({ message: 'Unauthorized: Invalid password' });
  }

  try {
    let state = await QuizState.findOne({ key: 'active_state' });
    if (!state) {
      state = new QuizState({ key: 'active_state' });
    }

    if (currentRoundIndex !== undefined) state.currentRoundIndex = currentRoundIndex;
    if (currentQuestionIndex !== undefined) state.currentQuestionIndex = currentQuestionIndex;
    if (showAnswer !== undefined) state.showAnswer = showAnswer;
    if (announcedWinner !== undefined) state.announcedWinner = announcedWinner;

    await state.save();
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quiz state', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
