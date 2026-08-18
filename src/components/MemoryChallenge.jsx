import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';
const API_BASE  = import.meta.env.VITE_API_URL || '';

/* ─────────────────────────────────────────────
   ROUND DATA
   ───────────────────────────────────────────── */

// Round 1 — Easy: images displayed with a number + color label
// Each item: { id, label, emoji, color }
// Replace emoji with <img> src once real images are ready
const round1Objects = [
  { id: 1,  label: "Bicycle",     emoji: "🚲", color: "#3B82F6" },
  { id: 2,  label: "Apple",       emoji: "🍎", color: "#EF4444" },
  { id: 3,  label: "Umbrella",    emoji: "☂️",  color: "#8B5CF6" },
  { id: 4,  label: "Book",        emoji: "📘", color: "#0EA5E9" },
  { id: 5,  label: "Chair",       emoji: "🪑", color: "#D97706" },
  { id: 6,  label: "Star",        emoji: "⭐", color: "#F59E0B" },
  { id: 7,  label: "Fish",        emoji: "🐟", color: "#06B6D4" },
  { id: 8,  label: "Drum",        emoji: "🥁", color: "#EC4899" },
  { id: 9,  label: "Shoe",        emoji: "👟", color: "#10B981" },
  { id: 10, label: "Lantern",     emoji: "🏮", color: "#F97316" },
  { id: 11, label: "Kite",        emoji: "🪁", color: "#A78BFA" },
  { id: 12, label: "Lock",        emoji: "🔒", color: "#6B7280" },
];

const round1Questions = [
  { id: 1, text: "Q1. What number was with the Bicycle?",         answer: "#01" },
  { id: 2, text: "Q2. What was the 5th image shown?",            answer: "Chair" },
  { id: 3, text: "Q3. What color was the Apple card?",           answer: "Red" },
  { id: 4, text: "Q4. Which item had the number 8?",             answer: "Drum" },
  { id: 5, text: "Q5. What was shown right after the Book?",     answer: "Chair" },
  { id: 6, text: "Q6. What was the last item in the sequence?",  answer: "Lock" },
  { id: 7, text: "Q7. What number was the Fish?",                answer: "#07" },
  { id: 8, text: "Q8. What color was the Kite card?",            answer: "Purple" },
];

// Round 2 — Medium: images with numbers, harder questions
const round2Objects = [
  { id: 1,  label: "Camera",      emoji: "📷", color: "#1F2937" },
  { id: 2,  label: "Cactus",      emoji: "🌵", color: "#16A34A" },
  { id: 3,  label: "Trophy",      emoji: "🏆", color: "#CA8A04" },
  { id: 4,  label: "Rocket",      emoji: "🚀", color: "#1D4ED8" },
  { id: 5,  label: "Diamond",     emoji: "💎", color: "#0891B2" },
  { id: 6,  label: "Globe",       emoji: "🌍", color: "#15803D" },
  { id: 7,  label: "Hourglass",   emoji: "⏳", color: "#D97706" },
  { id: 8,  label: "Crown",       emoji: "👑", color: "#B45309" },
  { id: 9,  label: "Compass",     emoji: "🧭", color: "#7C3AED" },
  { id: 10, label: "Anchor",      emoji: "⚓", color: "#374151" },
  { id: 11, label: "Flame",       emoji: "🔥", color: "#DC2626" },
  { id: 12, label: "Leaf",        emoji: "🍃", color: "#059669" },
  { id: 13, label: "Candle",      emoji: "🕯️",  color: "#F59E0B" },
  { id: 14, label: "Flag",        emoji: "🚩", color: "#B91C1C" },
];

const round2Questions = [
  { id: 1, text: "Q1. What was between the Trophy and the Diamond?",   answer: "Rocket (#04)" },
  { id: 2, text: "Q2. What was the 9th item shown?",                   answer: "Compass" },
  { id: 3, text: "Q3. Which two items were green in color?",           answer: "Cactus & Leaf" },
  { id: 4, text: "Q4. What came immediately before the Crown?",       answer: "Hourglass (#07)" },
  { id: 5, text: "Q5. What number was given to the Anchor?",          answer: "#10" },
  { id: 6, text: "Q6. What was the 3rd item and what color was it?",  answer: "Trophy – Gold/Yellow" },
  { id: 7, text: "Q7. Name the item that came after the Flame.",      answer: "Leaf (#12)" },
  { id: 8, text: "Q8. How many items were shown in total?",           answer: "14" },
  { id: 9, text: "Q9. What was the very first item shown?",           answer: "Camera (#01)" },
  { id: 10,text: "Q10. What was between the Globe and Hourglass?",   answer: "Nothing – they were consecutive (#06 & #07)" },
];

// Round 3 — Difficult: pure text position/relationship questions
const round3Objects = [
  "Pizza", "Button", "Plate", "CD", "Coin", "Clock", "Biscuit", "Wheel",
  "Badge", "Donut", "Diya", "Magnet", "Bottle Cap", "Coconut Slice", "Target", "Dosa"
];

const round3Questions = [
  { id: 1, text: "Q1. What was the 7th object?",                  answer: "Biscuit" },
  { id: 2, text: "Q2. What came immediately after CD?",           answer: "Coin" },
  { id: 3, text: "Q3. What was the 14th object?",                 answer: "Coconut Slice" },
  { id: 4, text: "Q4. What came before Donut?",                   answer: "Badge" },
  { id: 5, text: "Q5. What was the 3rd food item?",               answer: "Donut (Pizza→Biscuit→Donut→Dosa)" },
  { id: 6, text: "Q6. What was between Coin and Biscuit?",        answer: "Clock" },
  { id: 7, text: "Q7. What was the last object?",                 answer: "Dosa" },
  { id: 8, text: "Q8. Which object had a hole in the middle?",    answer: "Button / CD / Coin / Wheel / Donut / Target" },
  { id: 9, text: "BONUS: Write all 16 objects in correct order.", answer: "Pizza→Button→Plate→CD→Coin→Clock→Biscuit→Wheel→Badge→Donut→Diya→Magnet→Bottle Cap→Coconut Slice→Target→Dosa" },
];

const roundMeta = [
  { round: 1, label: "Round 1",    difficulty: "Easy",     subtitle: "Image + Number Association",    color: "#22C55E", bgColor: "rgba(34,197,94,0.08)"  },
  { round: 2, label: "Round 2",    difficulty: "Medium",   subtitle: "Image Sequence & Relationships", color: "#F59E0B", bgColor: "rgba(245,158,11,0.08)"  },
  { round: 3, label: "Round 3",    difficulty: "Difficult","subtitle": "Position & Relationship Memory", color: "#EF4444", bgColor: "rgba(239,68,68,0.08)"   },
];

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
function getObjectsForRound(round) {
  if (round === 1) return round1Objects;
  if (round === 2) return round2Objects;
  return round3Objects;
}
function getQuestionsForRound(round) {
  if (round === 1) return round1Questions;
  if (round === 2) return round2Questions;
  return round3Questions;
}

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
   ───────────────────────────────────────────── */

// Image-style card for Rounds 1 & 2
function ImageObjectCard({ obj, index, totalObjects, showNumber = true, large = false }) {
  return (
    <motion.div
      key={obj.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${obj.color}22 0%, rgba(14,1,8,0.85) 100%)`,
        borderColor: `${obj.color}40`,
        minHeight: large ? '280px' : '100px',
        padding: large ? '2.5rem' : '1rem',
      }}
    >
      {showNumber && (
        <span
          className="absolute top-2 left-3 font-bold text-xs px-1.5 py-0.5 rounded"
          style={{ background: `${obj.color}30`, color: obj.color, fontFamily: JOST }}
        >
          #{obj.id.toString().padStart(2, '0')}
        </span>
      )}
      <span style={{ fontSize: large ? '5rem' : '2.2rem' }}>{obj.emoji}</span>
      <span
        className="font-bold mt-2 text-white text-center"
        style={{ fontFamily: JOST, fontSize: large ? '1.8rem' : '0.75rem' }}
      >
        {obj.label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN DISPLAY COMPONENT
   ───────────────────────────────────────────── */
export default function MemoryChallenge() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');

  const [currentRound, setCurrentRound] = useState(1);
  const [currentStage, setCurrentStage] = useState('lobby');
  const [currentObjectIndex, setCurrentObjectIndex] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);
  const [announcedWinner, setAnnouncedWinner] = useState('');

  // Local countdown mirror
  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimerSeconds(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerRunning, timerSeconds]);

  useEffect(() => {
    if (sessionStorage.getItem('memory_authenticated') === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchState = () => {
      fetch(`${API_BASE}/api/memory-state`)
        .then(r => r.json())
        .then(data => {
          if (!data) return;
          setCurrentRound(data.currentRound ?? 1);
          setCurrentStage(data.currentStage ?? 'lobby');
          setCurrentObjectIndex(data.currentObjectIndex ?? -1);
          setCurrentQuestionIndex(data.currentQuestionIndex ?? -1);
          setShowAnswer(data.showAnswer ?? false);
          setAnnouncedWinner(data.announcedWinner ?? '');
          setTimerSeconds(data.timerSeconds ?? 120);
          setTimerRunning(data.timerRunning ?? false);
        })
        .catch(() => {});
    };
    fetchState();
    const iv = setInterval(fetchState, 1000);
    return () => clearInterval(iv);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessCode === '5626') {
      sessionStorage.setItem('memory_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const objects   = getObjectsForRound(currentRound);
  const questions = getQuestionsForRound(currentRound);
  const meta      = roundMeta[currentRound - 1];
  const isImageRound = currentRound <= 2;

  // ── AUTH SCREEN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(25,4,15,0.95) 0%, rgba(14,1,8,0.98) 100%)', backdropFilter: 'blur(28px)' }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-wider"
              style={{ fontFamily: CORMORANT, background: 'linear-gradient(135deg, #F6C453, #ff6a3d)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Memory Challenge
            </h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-2" style={{ fontFamily: JOST }}>Presentation Screen</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" placeholder="••••" value={accessCode} onChange={e => setAccessCode(e.target.value)}
              className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-4 py-3 text-center text-xl tracking-widest outline-none"
              style={{ fontFamily: JOST }} required />
            {authError && <p className="text-red-500 text-xs text-center" style={{ fontFamily: JOST }}>{authError}</p>}
            <button type="submit" className="w-full text-white rounded-full py-3.5 text-sm font-bold uppercase tracking-wider cursor-pointer"
              style={{ fontFamily: JOST, background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)' }}>
              Open Screen
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── WINNER SCREEN ──
  if (announcedWinner) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10 }} className="text-center space-y-8 z-10 px-4">
          <motion.div animate={{ rotate: [0, -5, 5, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block text-[#ffb347] text-6xl md:text-8xl">🏆</motion.div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#ff4d8d] tracking-[0.4em] uppercase" style={{ fontFamily: JOST }}>
              Memory Challenge Winner
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider py-4"
              style={{ fontFamily: CORMORANT, background: 'linear-gradient(135deg, #FFF 20%, #F6C453 50%, #ff6a3d 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {announcedWinner}
            </h1>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── MAIN DISPLAY ──
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-3 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold tracking-wider" style={{ fontFamily: CORMORANT, color: '#F6C453' }}>ArtX'26</Link>
          <span className="text-white/20">|</span>
          <span className="text-xs uppercase tracking-widest text-white/60" style={{ fontFamily: JOST }}>Memory Challenge</span>
        </div>
        {/* Round badge */}
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
          style={{ fontFamily: JOST, color: meta.color, borderColor: `${meta.color}40`, background: meta.bgColor }}>
          {meta.label} · {meta.difficulty}
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 z-10 w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">

          {/* ── LOBBY ── */}
          {currentStage === 'lobby' && (
            <motion.div key="lobby" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-center space-y-8 w-full max-w-2xl">
              <h1 className="text-5xl md:text-8xl font-bold tracking-wider"
                style={{ fontFamily: CORMORANT, background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Memory Challenge
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {roundMeta.map(r => (
                  <div key={r.round} className="p-4 rounded-xl border text-center"
                    style={{ borderColor: `${r.color}30`, background: r.bgColor }}>
                    <p className="font-bold text-sm" style={{ fontFamily: JOST, color: r.color }}>{r.label}</p>
                    <p className="text-[10px] text-white/40 mt-1" style={{ fontFamily: JOST }}>{r.difficulty}</p>
                    <p className="text-[10px] text-white/50 mt-1" style={{ fontFamily: JOST }}>{r.subtitle}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-xl border border-white/5 bg-black/40">
                <p className="text-white/50 text-sm animate-pulse" style={{ fontFamily: JOST }}>
                  Waiting for the host to begin...
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STAGE: OBJECTS ── */}
          {currentStage === 'objects' && (
            <motion.div key="objects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: JOST, color: meta.color }}>
                  {meta.label} · Stage 1 — Memorize
                </span>
                <h2 className="text-white font-semibold text-sm uppercase tracking-widest" style={{ fontFamily: JOST }}>
                  {currentObjectIndex === -1 ? `All ${objects.length} Objects` : `Object ${currentObjectIndex + 1} of ${objects.length}`}
                </h2>
              </div>

              {currentObjectIndex === -1 ? (
                /* Grid of all objects */
                isImageRound ? (
                  <div className={`grid gap-3 ${currentRound === 1 ? 'grid-cols-3 md:grid-cols-4' : 'grid-cols-3 md:grid-cols-5'} max-w-4xl mx-auto`}>
                    {objects.map((obj, i) => <ImageObjectCard key={obj.id} obj={obj} index={i} />)}
                  </div>
                ) : (
                  /* Round 3 text grid */
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {objects.map((obj, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="p-5 rounded-xl border border-white/10 flex flex-col items-center text-center"
                        style={{ background: 'rgba(14,1,8,0.8)' }}>
                        <span className="text-[10px] text-white/30 font-bold mb-1">#{(i + 1).toString().padStart(2, '0')}</span>
                        <span className="text-white font-semibold" style={{ fontFamily: JOST }}>{obj}</span>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                /* One-by-one large card */
                isImageRound ? (
                  <div className="max-w-lg mx-auto">
                    <ImageObjectCard obj={objects[currentObjectIndex]} index={0} large />
                  </div>
                ) : (
                  <motion.div key={currentObjectIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[300px]"
                    style={{ background: 'rgba(14,1,8,0.85)', backdropFilter: 'blur(30px)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ fontFamily: JOST, color: meta.color }}>Object #{currentObjectIndex + 1}</span>
                    <h3 className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: CORMORANT }}>{objects[currentObjectIndex]}</h3>
                  </motion.div>
                )
              )}
            </motion.div>
          )}

          {/* ── STAGE: DRAWING TIMER ── */}
          {currentStage === 'drawing' && (
            <motion.div key="drawing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-center space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: JOST, color: meta.color }}>
                  {meta.label} · Stage 2 — Drawing
                </span>
                <h2 className="text-white/60 font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: JOST }}>
                  Sketch the objects you remember
                </h2>
              </div>
              <div className="max-w-sm mx-auto p-12 rounded-full border-2 border-white/5 flex flex-col items-center justify-center aspect-square"
                style={{ background: 'radial-gradient(circle, rgba(25,4,15,0.9) 0%, rgba(14,1,8,0.95) 100%)' }}>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2" style={{ fontFamily: JOST }}>Time Remaining</span>
                <h3 className={`text-7xl md:text-8xl font-bold font-mono ${timerSeconds <= 15 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  {formatTime(timerSeconds)}
                </h3>
              </div>
              <p className="text-sm text-white/50 max-w-sm mx-auto" style={{ fontFamily: JOST }}>
                {timerSeconds > 0
                  ? "Sketch what you saw! Don't look at others. / ഓർമ്മയിലുള്ളത് വരയ്ക്കുക."
                  : "⏰ Time's up! Put down your pencils. / സമയം കഴിഞ്ഞു!"}
              </p>
            </motion.div>
          )}

          {/* ── STAGE: QUESTIONS ── */}
          {currentStage === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: JOST, color: meta.color }}>
                  {meta.label} · Stage 3 — Questions
                </span>
              </div>

              {currentQuestionIndex === -1 ? (
                <div className="w-full max-w-3xl mx-auto bg-black/40 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4 border-b border-white/5 pb-2" style={{ fontFamily: CORMORANT }}>Answer the following</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {questions.map(q => (
                      <div key={q.id} className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                        <p className="text-white/80 text-xs font-semibold" style={{ fontFamily: JOST }}>{q.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-4xl space-y-6 mx-auto">
                  <div className="w-full p-8 md:p-14 rounded-3xl border border-white/10 flex flex-col justify-center min-h-[350px] relative overflow-hidden"
                    style={{ background: 'rgba(14,1,8,0.85)', backdropFilter: 'blur(30px)' }}>
                    <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/5 rounded-2xl pointer-events-none" />
                    <div className="relative z-10 space-y-3">
                      <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest" style={{ fontFamily: JOST }}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <p className="text-3xl md:text-5xl text-white font-bold leading-relaxed py-4" style={{ fontFamily: CORMORANT }}>
                        "{questions[currentQuestionIndex].text.replace(/^Q\d+\.\s*/, '').replace(/^BONUS:\s*/, '')}"
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center min-h-[70px]">
                    <AnimatePresence mode="wait">
                      {showAnswer && (
                        <motion.div key="ans" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                          className="bg-green-500/10 border border-green-500/20 rounded-2xl px-8 py-3.5">
                          <p className="text-green-400 font-bold text-xl md:text-2xl" style={{ fontFamily: JOST }}>
                            {questions[currentQuestionIndex].answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── STAGE: ANSWERS (full sequence reveal) ── */}
          {currentStage === 'answers' && (
            <motion.div key="answers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: JOST, color: meta.color }}>
                  {meta.label} · Correct Sequence
                </span>
              </div>

              {isImageRound ? (
                <div className={`grid gap-3 ${currentRound === 1 ? 'grid-cols-3 md:grid-cols-4' : 'grid-cols-3 md:grid-cols-5'} max-w-4xl mx-auto`}>
                  {objects.map((obj, i) => <ImageObjectCard key={obj.id} obj={obj} index={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                  {objects.map((obj, i) => (
                    <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="p-4 rounded-xl border border-white/5 flex flex-col items-center" style={{ background: 'rgba(14,1,8,0.7)' }}>
                      <span className="text-[9px] font-bold mb-1" style={{ color: meta.color }}>#{(i + 1).toString().padStart(2, '0')}</span>
                      <span className="text-white font-semibold text-sm" style={{ fontFamily: JOST }}>{obj}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
