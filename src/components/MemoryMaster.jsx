import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';
const API_BASE  = import.meta.env.VITE_API_URL || '';

const round1Objects = [
  { id: 1,  label: "Bicycle",     emoji: "🚲" },
  { id: 2,  label: "Apple",       emoji: "🍎" },
  { id: 3,  label: "Umbrella",    emoji: "☂️"  },
  { id: 4,  label: "Book",        emoji: "📘" },
  { id: 5,  label: "Chair",       emoji: "🪑" },
  { id: 6,  label: "Star",        emoji: "⭐" },
  { id: 7,  label: "Fish",        emoji: "🐟" },
  { id: 8,  label: "Drum",        emoji: "🥁" },
  { id: 9,  label: "Shoe",        emoji: "👟" },
  { id: 10, label: "Lantern",     emoji: "🏮" },
  { id: 11, label: "Kite",        emoji: "🪁" },
  { id: 12, label: "Lock",        emoji: "🔒" },
];

const round2Objects = [
  { id: 1,  label: "Camera",      emoji: "📷" },
  { id: 2,  label: "Cactus",      emoji: "🌵" },
  { id: 3,  label: "Trophy",      emoji: "🏆" },
  { id: 4,  label: "Rocket",      emoji: "🚀" },
  { id: 5,  label: "Diamond",     emoji: "💎" },
  { id: 6,  label: "Globe",       emoji: "🌍" },
  { id: 7,  label: "Hourglass",   emoji: "⏳" },
  { id: 8,  label: "Crown",       emoji: "👑" },
  { id: 9,  label: "Compass",     emoji: "🧭" },
  { id: 10, label: "Anchor",      emoji: "⚓" },
  { id: 11, label: "Flame",       emoji: "🔥" },
  { id: 12, label: "Leaf",        emoji: "🍃" },
  { id: 13, label: "Candle",      emoji: "🕯️"  },
  { id: 14, label: "Flag",        emoji: "🚩" },
];

const round3Objects = [
  "Pizza","Button","Plate","CD","Coin","Clock","Biscuit","Wheel",
  "Badge","Donut","Diya","Magnet","Bottle Cap","Coconut Slice","Target","Dosa"
];

const round1Questions = [
  { id: 1, text: "What number was with the Bicycle?" },
  { id: 2, text: "What was the 5th image shown?" },
  { id: 3, text: "Which item had the number 8?" },
  { id: 4, text: "What was shown right after the Book?" },
  { id: 5, text: "What was the last item in the sequence?" },
  { id: 6, text: "What number was the Fish?" },
  { id: 7, text: "What was the item at position 11?" },
  { id: 8, text: "Which item came just before the Lock?" },
];

const round2Questions = [
  { id: 1, text: "What was between the Trophy and the Diamond?" },
  { id: 2, text: "What was the 9th item shown?" },
  { id: 3, text: "What came immediately before the Crown?" },
  { id: 4, text: "What number was given to the Anchor?" },
  { id: 5, text: "What was the very first item shown?" },
  { id: 6, text: "What was between the Globe and Hourglass?" },
  { id: 7, text: "Name the item that came after the Flame." },
  { id: 8, text: "How many items were shown in total?" },
  { id: 9, text: "What was the 3rd item and what did it represent?" },
  { id: 10,text: "Name any two items that came after Compass." },
];

const round3Questions = [
  { id: 1, text: "What was the 7th object?" },
  { id: 2, text: "What came immediately after CD?" },
  { id: 3, text: "What was the 14th object?" },
  { id: 4, text: "What came before Donut?" },
  { id: 5, text: "What was the 3rd food item?" },
  { id: 6, text: "What was between Coin and Biscuit?" },
  { id: 7, text: "What was the last object?" },
  { id: 8, text: "Which object had a hole in the middle?" },
  { id: 9, text: "BONUS: Write the complete sequence of all 16 objects." },
];

const roundMeta = [
  { round: 1, label: "Round 1", difficulty: "Easy",      subtitle: "Image + Number", color: "#22C55E", bg: "rgba(34,197,94,0.1)"  },
  { round: 2, label: "Round 2", difficulty: "Medium",    subtitle: "Image Sequence", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  { round: 3, label: "Round 3", difficulty: "Difficult", subtitle: "Text Positions", color: "#EF4444", bg: "rgba(239,68,68,0.1)"  },
];

function getObjects(round)   { return round === 1 ? round1Objects   : round === 2 ? round2Objects   : round3Objects;   }
function getQuestions(round) { return round === 1 ? round1Questions : round === 2 ? round2Questions : round3Questions; }

export default function MemoryMaster() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode]           = useState('');
  const [authError, setAuthError]             = useState('');

  const [currentRound,         setCurrentRound]         = useState(1);
  const [currentStage,         setCurrentStage]         = useState('lobby');
  const [currentObjectIndex,   setCurrentObjectIndex]   = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswer,           setShowAnswer]           = useState(false);
  const [timerSeconds,         setTimerSeconds]         = useState(120);
  const [timerStartedAt,       setTimerStartedAt]       = useState(null);
  const [timerRunning,         setTimerRunning]         = useState(false);
  const [announcedWinner,      setAnnouncedWinner]      = useState('');

  // Timer 2 state
  const [timer2Seconds,         setTimer2Seconds]         = useState(60);
  const [timer2StartedAt,       setTimer2StartedAt]       = useState(null);
  const [timer2Running,         setTimer2Running]         = useState(false);

  const [winnerInput, setWinnerInput] = useState('');

  // Local display countdown (mirrors remaining time based on timestamp)
  const [displaySeconds, setDisplaySeconds] = useState(120);
  useEffect(() => {
    const tick = () => {
      if (timerRunning && timerStartedAt) {
        const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
        setDisplaySeconds(Math.max(0, timerSeconds - elapsed));
      } else {
        setDisplaySeconds(timerSeconds);
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [timerRunning, timerStartedAt, timerSeconds]);

  // Local display countdown for Timer 2
  const [display2Seconds, setDisplay2Seconds] = useState(60);
  useEffect(() => {
    const tick = () => {
      if (timer2Running && timer2StartedAt) {
        const elapsed = Math.floor((Date.now() - timer2StartedAt) / 1000);
        setDisplay2Seconds(Math.max(0, timer2Seconds - elapsed));
      } else {
        setDisplay2Seconds(timer2Seconds);
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [timer2Running, timer2StartedAt, timer2Seconds]);

  useEffect(() => {
    if (sessionStorage.getItem('memory_master_pass') === '5626') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetch_ = () => {
      fetch(`${API_BASE}/api/memory-state`)
        .then(r => r.json())
        .then(d => {
          if (!d) return;
          setCurrentRound(d.currentRound ?? 1);
          setCurrentStage(d.currentStage ?? 'lobby');
          setCurrentObjectIndex(d.currentObjectIndex ?? -1);
          setCurrentQuestionIndex(d.currentQuestionIndex ?? -1);
          setShowAnswer(d.showAnswer ?? false);
          setAnnouncedWinner(d.announcedWinner ?? '');
          setTimerSeconds(d.timerSeconds ?? 120);
          setTimerStartedAt(d.timerStartedAt ?? null);
          setTimerRunning(d.timerRunning ?? false);
          setTimer2Seconds(d.timer2Seconds ?? 60);
          setTimer2StartedAt(d.timer2StartedAt ?? null);
          setTimer2Running(d.timer2Running ?? false);
        })
        .catch(() => {});
    };
    fetch_();
    const iv = setInterval(fetch_, 1500);
    return () => clearInterval(iv);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessCode === '5626') {
      sessionStorage.setItem('memory_master_pass', '5626');
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  const push = async (updates) => {
    const password = '5626';
    try {
      const res = await fetch(`${API_BASE}/api/memory-state/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, password })
      });
      if (res.ok) {
        const d = await res.json();
        setCurrentRound(d.currentRound);
        setCurrentStage(d.currentStage);
        setCurrentObjectIndex(d.currentObjectIndex);
        setCurrentQuestionIndex(d.currentQuestionIndex);
        setShowAnswer(d.showAnswer);
        setAnnouncedWinner(d.announcedWinner);
        setTimerSeconds(d.timerSeconds);
        setTimerRunning(d.timerRunning);
        setTimer2Seconds(d.timer2Seconds);
        setTimer2Running(d.timer2Running);
        setTimer2StartedAt(d.timer2StartedAt);
      }
    } catch (e) { console.error(e); }
  };

  // Start timer 1
  const startTimer = (seconds) => push({
    timerRunning: true,
    timerSeconds: seconds,
    timerStartedAt: Date.now(),
  });

  // Pause timer 1
  const pauseTimer = () => {
    const elapsed = timerRunning && timerStartedAt ? Math.floor((Date.now() - timerStartedAt) / 1000) : 0;
    const remaining = Math.max(0, timerSeconds - elapsed);
    push({ timerRunning: false, timerStartedAt: null, timerSeconds: remaining });
  };

  // Start timer 2
  const startTimer2 = (seconds) => push({
    timer2Running: true,
    timer2Seconds: seconds,
    timer2StartedAt: Date.now(),
  });

  // Pause timer 2
  const pauseTimer2 = () => {
    const elapsed = timer2Running && timer2StartedAt ? Math.floor((Date.now() - timer2StartedAt) / 1000) : 0;
    const remaining = Math.max(0, timer2Seconds - elapsed);
    push({ timer2Running: false, timer2StartedAt: null, timer2Seconds: remaining });
  };

  const switchRound = (r) => push({
    currentRound: r, currentStage: 'lobby',
    currentObjectIndex: -1, currentQuestionIndex: -1,
    showAnswer: false,
    timerRunning: false, timerStartedAt: null, timerSeconds: 120,
    timer2Running: false, timer2StartedAt: null, timer2Seconds: 60,
    announcedWinner: ''
  });

  const switchStage = (s) => {
    if (s === 'reveal_q_answers') {
      push({
        currentStage: 'questions',
        currentObjectIndex: -1,
        currentQuestionIndex: -1,
        showAnswer: true,
        timerRunning: false,
        timerStartedAt: null,
        timer2Running: false,
        timer2StartedAt: null
      });
    } else {
      push({
        currentStage: s,
        currentObjectIndex: -1,
        currentQuestionIndex: -1,
        showAnswer: false,
        timerRunning: false,
        timerStartedAt: null,
        timer2Running: false,
        timer2StartedAt: null
      });
    }
  };

  const objects   = getObjects(currentRound);
  const questions = getQuestions(currentRound);
  const isImageRound = currentRound <= 2;
  const meta      = roundMeta[currentRound - 1];
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ── AUTH ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(25,4,15,0.95) 0%, rgba(14,1,8,0.98) 100%)', backdropFilter: 'blur(28px)' }}>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-wider"
              style={{ fontFamily: CORMORANT, background: 'linear-gradient(135deg, #F6C453, #ff6a3d)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Memory Console
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="••••" value={accessCode} onChange={e => setAccessCode(e.target.value)}
              className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-4 py-3 text-center text-xl tracking-widest outline-none"
              style={{ fontFamily: JOST }} required />
            {authError && <p className="text-red-500 text-xs text-center">{authError}</p>}
            <button type="submit" className="w-full text-white rounded-full py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              style={{ fontFamily: JOST, background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)' }}>
              Unlock Console
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── MAIN CONSOLE ──
  return (
    <div className="min-h-screen w-full flex flex-col relative" style={{ background: '#0e0108', color: '#E8D9DD' }}>

      {/* Header */}
      <header className="w-full px-4 py-3 border-b border-white/5 flex justify-between items-center bg-black/20">
        <span className="text-sm font-bold" style={{ fontFamily: CORMORANT, color: '#F6C453' }}>Memory Console</span>
        <button onClick={() => { sessionStorage.removeItem('memory_master_pass'); setIsAuthenticated(false); }}
          className="px-3 py-1 rounded-full border border-white/10 text-white/50 text-[9px] uppercase font-bold tracking-wider cursor-pointer"
          style={{ fontFamily: JOST }}>Lock</button>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-md mx-auto w-full pb-48">

        {/* Winner Active Banner */}
        {announcedWinner && (
          <div className="p-4 rounded-2xl border border-green-500/25 bg-green-500/10 text-center space-y-3 shadow-xl backdrop-blur-md">
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest block">Active Winner announced</span>
            <h4 className="text-white text-xl font-bold font-mono tracking-wider">{announcedWinner}</h4>
            <button onClick={() => { setWinnerInput(''); push({ announcedWinner: '' }); }}
              className="px-6 py-2 text-xs font-bold text-red-400 border border-red-500/30 bg-red-500/10 rounded-full uppercase tracking-wider cursor-pointer active:scale-95 transition-transform">
              Clear Screen
            </button>
          </div>
        )}

        {/* 1. ROUND SELECTOR */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>Active Round</label>
          <div className="grid grid-cols-3 gap-2">
            {roundMeta.map(r => (
              <button key={r.round} onClick={() => switchRound(r.round)}
                className="py-3 px-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all active:scale-95 flex flex-col items-center justify-center min-h-[56px]"
                style={{
                  fontFamily: JOST,
                  background: currentRound === r.round ? r.bg : 'rgba(255,255,255,0.01)',
                  borderColor: currentRound === r.round ? r.color : 'rgba(255,255,255,0.05)',
                  color: currentRound === r.round ? r.color : '#BFAFB4',
                  boxShadow: currentRound === r.round ? `0 4px 12px ${r.color}20` : 'none'
                }}>
                <span className="text-xs">{r.label}</span>
                <span className="text-[8px] opacity-60 font-medium uppercase tracking-wider mt-0.5">{r.difficulty}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. STAGE SWITCHER */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>Switch Stage</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'lobby',            label: '🏠 Lobby',              round: null },
              { id: 'objects',          label: '📦 Show Objects',       round: null },
              { id: 'drawing',          label: '🎨 Drawing Timer',      round: 3    }, // Round 3 only
              { id: 'questions',        label: '❓ Questions',           round: null },
              { id: 'reveal_q_answers', label: '🎓 Reveal Answers',     round: null },
              { id: 'answers',          label: '🔢 Reveal Sequence',     round: null, full: true },
            ]
              .filter(s => s.round === null || s.round === currentRound)
              .map(s => {
                const isActive = 
                  s.id === 'reveal_q_answers'
                    ? (currentStage === 'questions' && currentQuestionIndex === -1 && showAnswer)
                    : s.id === 'questions'
                    ? (currentStage === 'questions' && !(currentQuestionIndex === -1 && showAnswer))
                    : (currentStage === s.id);
                return (
                  <button key={s.id} onClick={() => switchStage(s.id)}
                    className={`py-3 px-2 rounded-xl border text-center font-bold text-xs uppercase cursor-pointer transition-all active:scale-95 ${s.full ? 'col-span-2' : ''}`}
                    style={{
                      fontFamily: JOST,
                      background: isActive ? 'rgba(246,196,83,0.12)' : 'rgba(255,255,255,0.01)',
                      borderColor: isActive ? '#F6C453' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#F6C453' : '#BFAFB4',
                      boxShadow: isActive ? '0 4px 12px rgba(246,196,83,0.15)' : 'none'
                    }}>
                    {s.label}
                  </button>
                );
              })}
          </div>
        </div>

        {/* 3a. OBJECT CONTROLS (stages objects) */}
        {currentStage === 'objects' && (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
                Object Selector ({objects.length} items)
              </label>
              {currentRound === 3 && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                  Timer auto-starts
                </span>
              )}
            </div>

            <button onClick={() => push({ currentObjectIndex: -1, timerRunning: false, timerStartedAt: null })}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase border cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                fontFamily: JOST,
                background: currentObjectIndex === -1 ? 'rgba(255,77,141,0.15)' : 'rgba(255,255,255,0.01)',
                borderColor: currentObjectIndex === -1 ? '#ff4d8d' : 'rgba(255,255,255,0.05)',
                color: currentObjectIndex === -1 ? '#ff4d8d' : '#BFAFB4',
                boxShadow: currentObjectIndex === -1 ? '0 4px 12px rgba(255,77,141,0.15)' : 'none'
              }}>
              Show All {objects.length} {isImageRound ? 'Images' : 'Objects'}
            </button>

            {/* Tap Grid - Clean 4 columns on mobile */}
            <div className="grid grid-cols-4 gap-2">
              {objects.map((obj, i) => (
                <button key={i} onClick={() => {
                    if (currentRound === 3 && !timerRunning && i === 0) {
                      push({ currentObjectIndex: i, timerRunning: true, timerStartedAt: Date.now() });
                    } else {
                      push({ currentObjectIndex: i });
                    }
                  }}
                  className="py-3.5 rounded-xl font-bold cursor-pointer transition-all active:scale-[0.85] text-sm"
                  style={{
                    background: currentObjectIndex === i ? 'rgba(246,196,83,0.2)' : 'rgba(255,255,255,0.01)',
                    border: currentObjectIndex === i ? '1px solid #F6C453' : '1px solid rgba(255,255,255,0.05)',
                    color: currentObjectIndex === i ? '#F6C453' : '#fff',
                    boxShadow: currentObjectIndex === i ? '0 4px 10px rgba(246,196,83,0.15)' : 'none'
                  }}>
                  #{i + 1}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => { if (currentObjectIndex > 0) push({ currentObjectIndex: currentObjectIndex - 1 }); }}
                disabled={currentObjectIndex <= 0}
                className="py-3 bg-white/5 disabled:opacity-20 text-white font-bold text-xs uppercase rounded-xl border border-white/10 cursor-pointer active:scale-95 transition-transform">
                ◀ Prev
              </button>
              <button onClick={() => {
                  if (currentObjectIndex < objects.length - 1) {
                    const nextIdx = currentObjectIndex + 1;
                    if (currentRound === 3 && currentObjectIndex === -1 && !timerRunning) {
                      push({ currentObjectIndex: 0, timerRunning: true, timerStartedAt: Date.now() });
                    } else {
                      push({ currentObjectIndex: nextIdx });
                    }
                  }
                }}
                disabled={currentObjectIndex >= objects.length - 1}
                className="py-3 bg-white/5 disabled:opacity-20 text-[#F6C453] font-bold text-xs uppercase rounded-xl border border-[#F6C453]/20 cursor-pointer active:scale-95 transition-transform">
                Next ▶
              </button>
            </div>
          </div>
        )}

        {/* 3b. TIMER CONTROLS (Round 3 drawing stage only) */}
        {currentStage === 'drawing' && currentRound === 3 && (
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center space-y-4 shadow-lg">
            <label className="block text-left text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>Drawing Timer</label>
            <div className={`text-6xl font-mono font-bold py-2 tracking-wider ${displaySeconds <= 15 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTime(displaySeconds)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => startTimer(displaySeconds)} disabled={timerRunning || displaySeconds <= 0}
                className="py-3 bg-green-600 disabled:opacity-30 text-white font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95 transition-transform shadow-lg shadow-green-600/25">
                ▶ Start
              </button>
              <button onClick={pauseTimer} disabled={!timerRunning}
                className="py-3 bg-yellow-600 disabled:opacity-30 text-white font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95 transition-transform shadow-lg shadow-yellow-600/25">
                ⏸ Pause
              </button>
              <button onClick={() => push({ timerRunning: false, timerStartedAt: null, timerSeconds: 120 })}
                className="py-2.5 bg-white/5 text-[#BFAFB4] font-bold text-xs uppercase rounded-xl border border-white/10 cursor-pointer active:scale-95 transition-transform">
                Reset 2m
              </button>
              <button onClick={() => push({ timerRunning: false, timerStartedAt: null, timerSeconds: 180 })}
                className="py-2.5 bg-white/5 text-[#BFAFB4] font-bold text-xs uppercase rounded-xl border border-white/10 cursor-pointer active:scale-95 transition-transform">
                Reset 3m
              </button>
            </div>
          </div>
        )}

        {/* 3c. QUESTION LIST (stage: questions) */}
        {currentStage === 'questions' && (
          <div className="space-y-4">
            
            {/* Dedicated Answer Timer Controls (Visible to Host during Questions Stage) */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center space-y-3 shadow-lg">
              <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest font-bold" style={{ fontFamily: JOST }}>
                <span>Answer Timer</span>
                <span className={timer2Running ? 'text-[#ff4d8d]' : 'text-white'}>{timer2Running ? 'Running' : 'Paused'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-5xl font-mono font-bold tracking-wider ${timer2Running ? 'text-[#ff4d8d]' : 'text-white'}`}>
                  {formatTime(display2Seconds)}
                </span>
                <div className="flex gap-1.5">
                  <button onClick={() => { if (timer2Running) pauseTimer2(); else startTimer2(display2Seconds); }}
                    className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer active:scale-95"
                    style={{ fontFamily: JOST }}>
                    {timer2Running ? 'Pause' : 'Start'}
                  </button>
                  <button onClick={() => push({ timer2Running: false, timer2StartedAt: null, timer2Seconds: 30 })}
                    className="px-3 py-2.5 bg-white/5 border border-white/10 text-[#BFAFB4] font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95"
                    style={{ fontFamily: JOST }}>
                    30s
                  </button>
                  <button onClick={() => push({ timer2Running: false, timer2StartedAt: null, timer2Seconds: 60 })}
                    className="px-3 py-2.5 bg-white/5 border border-white/10 text-[#BFAFB4] font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95"
                    style={{ fontFamily: JOST }}>
                    60s
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
                  Questions — {meta.label}
                </label>
                <div className="flex gap-2">
                  <button onClick={() => push({ currentQuestionIndex: -1, showAnswer: false })}
                    className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer px-2 py-1 rounded-lg border transition-all active:scale-95 ${currentQuestionIndex === -1 && !showAnswer ? 'border-[#ffb347] text-[#ffb347] bg-[#ffb347]/10' : 'border-white/10 text-white/40'}`}
                    style={{ fontFamily: JOST }}>
                    Questions
                  </button>
                  <button onClick={() => push({ currentQuestionIndex: -1, showAnswer: true })}
                    className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer px-2 py-1 rounded-lg border transition-all active:scale-95 ${currentQuestionIndex === -1 && showAnswer ? 'border-green-400 text-green-400 bg-green-500/10' : 'border-white/10 text-white/40'}`}
                    style={{ fontFamily: JOST }}>
                    Answers
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 p-1 bg-black/40 rounded-xl">
                {questions.map((q, i) => (
                  <button key={q.id} onClick={() => push({ currentQuestionIndex: i, showAnswer: false })}
                    className="w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer active:scale-[0.98]"
                    style={{
                      background: currentQuestionIndex === i ? 'rgba(255,77,141,0.08)' : 'transparent',
                      borderColor: currentQuestionIndex === i ? 'rgba(255,77,141,0.4)' : 'rgba(255,255,255,0.03)',
                      color: currentQuestionIndex === i ? '#ff4d8d' : '#E8D9DD',
                    }}>
                    <span className="font-bold text-[10px] opacity-60 bg-white/5 px-2 py-0.5 rounded-lg shrink-0">Q{q.id}</span>
                    <span className="whitespace-normal break-words font-medium leading-relaxed">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. WINNER ANNOUNCER */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
            Announce Winner
          </label>
          <form onSubmit={(e) => { e.preventDefault(); if (winnerInput.trim()) push({ announcedWinner: winnerInput.trim() }); }} className="flex gap-2">
            <input type="text" placeholder="Type team name..." value={winnerInput}
              onChange={e => setWinnerInput(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff4d8d]/50"
              style={{ fontFamily: JOST }} />
            <button type="submit"
              className="bg-[#ff4d8d] hover:opacity-90 text-white font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-opacity cursor-pointer shadow-lg shadow-pink-600/25 active:scale-95"
              style={{ fontFamily: JOST }}>
              Go
            </button>
          </form>
        </div>

      </main>

      {/* Fixed Bottom — Question Controls */}
      {currentStage === 'questions' && currentQuestionIndex !== -1 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0e0108]/95 backdrop-blur-md z-40 max-w-md mx-auto shadow-2xl">
          <div className="space-y-3">
            {/* Timer 2 (Answer Timer) - All Rounds */}
            {
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
                  Answer Timer
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono text-base font-bold mr-2 ${timer2Running ? 'text-[#ff4d8d]' : 'text-white'}`}>
                    {formatTime(display2Seconds)}
                  </span>
                  <button
                    onClick={() => {
                      if (timer2Running) {
                        pauseTimer2();
                      } else {
                        startTimer2(display2Seconds);
                      }
                    }}
                    className="px-3.5 py-2 text-[10px] font-bold uppercase rounded-lg border border-white/10 text-white cursor-pointer bg-white/5 active:scale-95"
                    style={{ fontFamily: JOST }}
                  >
                    {timer2Running ? '⏸ Pause' : '▶ Start'}
                  </button>
                  <button
                    onClick={() => push({ timer2Running: false, timer2StartedAt: null, timer2Seconds: 30 })}
                    className="px-2 py-2 text-[10px] uppercase rounded-lg border border-white/10 text-white/50 cursor-pointer active:scale-95"
                    style={{ fontFamily: JOST }}
                  >
                    30s
                  </button>
                  <button
                    onClick={() => push({ timer2Running: false, timer2StartedAt: null, timer2Seconds: 60 })}
                    className="px-2 py-2 text-[10px] uppercase rounded-lg border border-white/10 text-white/50 cursor-pointer active:scale-95"
                    style={{ fontFamily: JOST }}
                  >
                    60s
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between text-[10px] text-white/40 uppercase font-bold" style={{ fontFamily: JOST }}>
              <span>Q{currentQuestionIndex + 1} of {questions.length}</span>
              <span className={showAnswer ? 'text-green-400' : 'text-yellow-400'}>{showAnswer ? 'Visible' : 'Hidden'}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => currentQuestionIndex > 0 && push({ currentQuestionIndex: currentQuestionIndex - 1, showAnswer: false, timer2Running: false, timer2StartedAt: null })}
                disabled={currentQuestionIndex === 0}
                className="py-3.5 bg-white/5 disabled:opacity-20 text-white text-center font-bold text-xs uppercase rounded-xl border border-white/10 cursor-pointer active:scale-95 transition-transform"
                style={{ fontFamily: JOST }}>◀ Prev</button>
              <button onClick={() => push({ showAnswer: !showAnswer })}
                className="py-3.5 text-center font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95 transition-transform shadow-lg"
                style={{ fontFamily: JOST, background: showAnswer ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#ff4d8d,#ff6a3d)', color: '#fff', boxShadow: showAnswer ? '0 4px 10px rgba(16,185,129,0.2)' : '0 4px 10px rgba(255,77,141,0.2)' }}>
                {showAnswer ? 'Hide' : 'Answer'}
              </button>
              <button onClick={() => currentQuestionIndex < questions.length - 1 && push({ currentQuestionIndex: currentQuestionIndex + 1, showAnswer: false, timer2Running: false, timer2StartedAt: null })}
                disabled={currentQuestionIndex === questions.length - 1}
                className="py-3.5 bg-white/5 disabled:opacity-20 text-[#F6C453] text-center font-bold text-xs uppercase rounded-xl border border-[#F6C453]/20 cursor-pointer active:scale-95 transition-transform"
                style={{ fontFamily: JOST }}>Next ▶</button>
            </div>

            {/* Reveal All Answers Button (available at any point, useful at the end of questions) */}
            <button onClick={() => push({ currentQuestionIndex: -1, showAnswer: true, timer2Running: false, timer2StartedAt: null })}
              className="w-full mt-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer active:scale-95 shadow-lg shadow-green-600/20"
              style={{ fontFamily: JOST }}>
              🎓 Reveal All Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
