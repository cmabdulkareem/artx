import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';
const API_BASE  = import.meta.env.VITE_API_URL || '';

const quizData = [
  {
    roundName: "1st Round – ഒന്നാം റൗണ്ട്",
    questions: [
      { id: 1, text: "Who were the first foreigners to arrive in India? / ഇന്ത്യയിലേക്ക് ആദ്യമായി എത്തിയ വിദേശികൾ ആരാണ്?" },
      { id: 2, text: "Vasco da Gama was a navigator from which country? / വാസ്കോ ഡ ഗാമ ഏത് രാജ്യത്തിന്റെ നാവികനായിരുന്നു?" },
      { id: 3, text: "Who is the current Minister for Higher Education in Kerala? / കേരളത്തിലെ നിലവിലെ ഉന്നത വിദ്യാഭ്യാസ മന്ത്രി ആരാണ്?" },
      { id: 4, text: "Who is the founder of the Cockroach Janta Party (CJP)? / Cockroach Janta Party (CJP) യുടെ സ്ഥാപകൻ ആര്?" },
      { id: 5, text: "In which year did the First War of Independence in India take place? / ഇന്ത്യയിലെ ഒന്നാം സ്വാതന്ത്ര്യസമരം നടന്നത് ഏത് വർഷമാണ്?" },
      { id: 6, text: "Which is the most recently formed district in Kerala? / കേരളത്തിൽ ഏറ്റവും അവസാനം രൂപീകൃതമായ ജില്ല ഏത്?" },
      { id: 7, text: "What is the name of the current District Police Chief of Kasaragod district? / കാസർകോട് ജില്ലയിലെ നിലവിലെ ജില്ലാ പോലീസ് മേധാവിയുടെ പേര് എന്താണ്?" },
      { id: 8, text: "What is the name of the alcohol blended with petrol in the E20 petrol currently available in India? / നിലവിൽ ഇന്ത്യയിൽ പുറത്തിറങ്ങുന്ന E20 പെട്രോളിൽ കലർത്തുന്ന ആൽക്കഹോളിന്റെ പേര് എന്താണ്?" },
      { id: 9, text: "Where does the Prime Minister hoist the Indian national flag on Independence Day? / സ്വാതന്ത്ര്യദിനത്തിൽ പ്രധാനമന്ത്രി ഇന്ത്യയുടെ ദേശീയപതാക ഉയർത്തുന്നത് എവിടെയാണ്?" },
      { id: 10, text: "In which year, month and date did India become a Republic? / ഇന്ത്യ റിപ്പബ്ലിക്കായ വർഷം, മാസം, തീയതി ഏതാണ്?" }
    ]
  },
  {
    roundName: "2nd Round – രണ്ടാം റൗണ്ട്",
    questions: [
      { id: 1, text: "What was the name of the company established by the British in India? / ഇന്ത്യയിൽ ബ്രിട്ടീഷുകാർ സ്ഥാപിച്ച കമ്പനിയുടെ പേര് എന്താണ്?" },
      { id: 2, text: "Whose slogan was “Do or Die”? / “പ്രവർത്തിക്കുക അല്ലെങ്കിൽ മരിക്കുക” ആരുടെ മുദ്രാവാക്യമായിരുന്നു?" },
      { id: 3, text: "Who was the first Education Minister of India? / ഇന്ത്യയുടെ ആദ്യത്തെ വിദ്യാഭ്യാസ മന്ത്രിയുടെ പേര് എന്താണ്?" },
      { id: 4, text: "Which district in Kerala has the highest number of rivers? / കേരളത്തിൽ ഏറ്റവും കൂടുതൽ നദികളുള്ള ജില്ല ഏതാണ്?" },
      { id: 5, text: "Who is the current Chairperson of Kasaragod Municipality? / കാസർകോട് മുനിസിപ്പാലിറ്റിയുടെ നിലവിലെ ചെയർപേഴ്സൺ ആരാണ്?" },
      { id: 6, text: "Rabindranath Tagore, who wrote India's National Anthem, also wrote the National Anthem of another country. Which country is it? / ഇന്ത്യയുടെ ദേശീയഗാനം രചിച്ച രവീന്ദ്രനാഥ ടാഗോർ മറ്റൊരു രാജ്യത്തിന്റെ ദേശീയഗാനവും രചിച്ചിട്ടുണ്ട്. ഏത് രാജ്യത്തിന്റേതാണ് അത്?" },
      { id: 7, text: "Where is the official place where the Indian national flag is manufactured? / ഇന്ത്യയുടെ ദേശീയപതാക ഔദ്യോഗികമായി നിർമ്മിക്കുന്ന സ്ഥലം എവിടെയാണ്?" },
      { id: 8, text: "Which is the northernmost river in Kerala? / കേരളത്തിലെ ഏറ്റവും വടക്കേ അറ്റത്തുള്ള നദി ഏതാണ്?" },
      { id: 9, text: "Who is the current Minister for Youth Affairs and Sports in Kerala? / നിലവിൽ കേരളത്തിന്റെ യുവജനകാര്യ വകുപ്പ് മന്ത്രി ആര്?" },
      { id: 10, text: "Who was India's first woman Prime Minister? / ഇന്ത്യയുടെ ആദ്യത്തെ വനിതാ പ്രധാനമന്ത്രി ആരായിരുന്നു?" }
    ]
  },
  {
    roundName: "3rd Round – മൂന്നാം റൗണ്ട്",
    questions: [
      { id: 1, text: "Which Indian Education Minister resigned following the protest by the Cockroach Janta Party (CJP)? / Cockroach Janta Party (CJP) യുടെ സമരത്തെ തുടർന്ന് രാജിവെച്ച ഇന്ത്യയുടെ വിദ്യാഭ്യാസ മന്ത്രി ആരായിരുന്നു?" },
      { id: 2, text: "What was the name of the ship on which Vasco da Gama first arrived in India? / വാസ്കോ ഡ ഗാമ ഇന്ത്യയിലേക്ക് ആദ്യമായി എത്തിയ കപ്പലിന്റെ പേര് എന്തായിരുന്നു?" },
      { id: 3, text: "What is the current official name of Kerala, following the passing of the Bill in Parliament on August 12, 2026? / 2026 ഓഗസ്റ്റ് 12-ന് പാർലമെന്റിൽ ബിൽ പാസാക്കിയതിനെ തുടർന്ന് കേരളത്തിന്റെ നിലവിലെ ഔദ്യോഗിക പേര് എന്താണ്?" },
      { id: 4, text: "Which is the highest peak in Kerala? / കേരളത്തിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി ഏതാണ്?" },
      { id: 5, text: "Who is the current Transport Minister of Kerala? / കേരളത്തിന്റെ നിലവിലെ ഗതാഗത മന്ത്രി ആരാണ്?" }
    ]
  }
];

export default function QuizMaster() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');

  // Local mirror of the remote quiz state
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [announcedWinner, setAnnouncedWinner] = useState('');

  const [winnerInput, setWinnerInput] = useState('');

  // Check authentication in sessionStorage
  useEffect(() => {
    const code = sessionStorage.getItem('quiz_master_pass');
    if (code === '5626') {
      setIsAuthenticated(true);
    }
  }, []);

  // Poll state from server every 1.5 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchState = () => {
      fetch(`${API_BASE}/api/quiz-state`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setCurrentRoundIndex(data.currentRoundIndex ?? 0);
            setCurrentQuestionIndex(data.currentQuestionIndex ?? -1);
            setShowAnswer(data.showAnswer ?? false);
            setAnnouncedWinner(data.announcedWinner ?? '');
          }
        })
        .catch(err => console.error('Error fetching state:', err));
    };

    fetchState();
    const interval = setInterval(fetchState, 1500);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessCode === '5626') {
      sessionStorage.setItem('quiz_master_pass', '5626');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('quiz_master_pass');
    setIsAuthenticated(false);
    setAccessCode('');
  };

  // Push state updates to server
  const updateRemoteState = async (updates) => {
    const password = sessionStorage.getItem('quiz_master_pass') || '5626';
    try {
      const res = await fetch(`${API_BASE}/api/quiz-state/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, password })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentRoundIndex(data.currentRoundIndex);
        setCurrentQuestionIndex(data.currentQuestionIndex);
        setShowAnswer(data.showAnswer);
        setAnnouncedWinner(data.announcedWinner);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to update quiz state');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating state');
    }
  };

  const startRound = (roundIdx) => {
    updateRemoteState({
      currentRoundIndex: roundIdx,
      currentQuestionIndex: -1,
      showAnswer: false,
      announcedWinner: ''
    });
  };

  const selectQuestion = (qIdx) => {
    updateRemoteState({
      currentQuestionIndex: qIdx,
      showAnswer: false
    });
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      updateRemoteState({
        currentQuestionIndex: currentQuestionIndex - 1,
        showAnswer: false
      });
    }
  };

  const nextQuestion = () => {
    const total = quizData[currentRoundIndex].questions.length;
    if (currentQuestionIndex < total - 1) {
      updateRemoteState({
        currentQuestionIndex: currentQuestionIndex + 1,
        showAnswer: false
      });
    }
  };

  const toggleAnswer = () => {
    updateRemoteState({ showAnswer: !showAnswer });
  };

  const exitToRounds = () => {
    updateRemoteState({ currentQuestionIndex: -1, showAnswer: false });
  };

  const handleAnnounceWinner = (e) => {
    e.preventDefault();
    if (!winnerInput.trim()) return;
    updateRemoteState({ announcedWinner: winnerInput.trim() });
  };

  const handleClearWinner = () => {
    setWinnerInput('');
    updateRemoteState({ announcedWinner: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(25, 4, 15, 0.95) 0%, rgba(14, 1, 8, 0.98) 100%)',
            backdropFilter: 'blur(28px)',
          }}
        >
          <div className="text-center mb-6">
            <h1
              className="text-3xl font-bold tracking-wider"
              style={{
                fontFamily: CORMORANT,
                background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Quiz Master Console
            </h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2" style={{ fontFamily: JOST }}>
              Access Code Verification
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#ffb347] uppercase tracking-wider" style={{ fontFamily: JOST }}>
                Access Password
              </label>
              <input
                type="password"
                placeholder="••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-4 py-3 text-center text-xl tracking-widest outline-none focus:border-accent-pink/50 transition-colors"
                style={{ fontFamily: JOST }}
                required
              />
              {authError && (
                <p className="text-red-500 text-xs text-center font-medium mt-2" style={{ fontFamily: JOST }}>
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-pink to-accent-orange text-white rounded-full py-3.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-accent-pink/20"
              style={{
                fontFamily: JOST,
                background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)',
              }}
            >
              Unlock Console
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const currentRound = quizData[currentRoundIndex];
  const totalQuestions = currentRound?.questions.length ?? 0;
  const isLobby = currentQuestionIndex === -1;

  return (
    <div className="min-h-screen w-full flex flex-col relative" style={{ background: '#0e0108', color: '#E8D9DD' }}>
      {/* Header bar */}
      <header className="w-full px-4 py-3 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wider" style={{ fontFamily: CORMORANT, color: '#F6C453' }}>
            ArtX'26 QM
          </span>
          <span className="bg-[#ff4d8d]/20 text-[#ff4d8d] text-[9px] uppercase font-bold px-2 py-0.5 rounded-full tracking-widest">
            Control
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white text-[9px] uppercase font-bold tracking-wider transition-colors cursor-pointer active:scale-95"
          style={{ fontFamily: JOST }}
        >
          Lock
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 space-y-6 max-w-md mx-auto w-full pb-48">
        
        {/* Active Winner Banner Block */}
        {announcedWinner && (
          <div className="p-4 rounded-2xl border border-green-500/25 bg-green-500/10 text-center space-y-3 shadow-xl backdrop-blur-md">
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest block">Active Winner announced</span>
            <h4 className="text-white text-xl font-bold font-mono tracking-wider">{announcedWinner}</h4>
            <button
              onClick={handleClearWinner}
              className="px-6 py-2 text-xs font-bold text-red-400 border border-red-500/30 bg-red-500/10 rounded-full uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
            >
              Clear Screen
            </button>
          </div>
        )}

        {/* 1. Round Selectors */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
            Select Round (Start/Switch)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {quizData.map((round, idx) => {
              const isActive = currentRoundIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => startRound(idx)}
                  className="py-3 px-1.5 rounded-xl border text-center font-bold text-xs uppercase transition-all cursor-pointer min-h-[56px] active:scale-95 flex flex-col items-center justify-center"
                  style={{
                    fontFamily: JOST,
                    background: isActive ? 'rgba(246,196,83,0.12)' : 'rgba(255,255,255,0.01)',
                    borderColor: isActive ? '#F6C453' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#F6C453' : '#BFAFB4',
                    boxShadow: isActive ? '0 4px 12px rgba(246,196,83,0.15)' : 'none'
                  }}
                >
                  <span>Round {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Questions Directory for current Round */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
              {currentRound.roundName.split(' – ')[1]} Directory
            </label>
            {!isLobby && (
              <button
                onClick={exitToRounds}
                className="text-[9px] text-[#ff4d8d] bg-[#ff4d8d]/10 px-2 py-1 rounded-lg border border-[#ff4d8d]/25 font-bold uppercase tracking-wider cursor-pointer active:scale-95"
                style={{ fontFamily: JOST }}
              >
                Send to Lobby
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 p-1 bg-black/40 rounded-xl">
            {currentRound.questions.map((q, idx) => {
              const isSelected = currentQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => selectQuestion(idx)}
                  className="w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer active:scale-[0.98]"
                  style={{
                    background: isSelected ? 'rgba(255,77,141,0.08)' : 'transparent',
                    borderColor: isSelected ? 'rgba(255,77,141,0.4)' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#ff4d8d' : '#E8D9DD',
                  }}
                >
                  <span className="font-bold text-[10px] opacity-60 bg-white/5 px-2 py-0.5 rounded-lg shrink-0">Q{q.id}</span>
                  <span className="whitespace-normal break-words font-medium leading-relaxed">{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Announce Winner Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 shadow-lg">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: JOST }}>
            Announce Grand Winner
          </label>
          <form onSubmit={handleAnnounceWinner} className="flex gap-2">
            <input
              type="text"
              placeholder="Type Winner Name..."
              value={winnerInput}
              onChange={(e) => setWinnerInput(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff4d8d]/50"
              style={{ fontFamily: JOST }}
            />
            <button
              type="submit"
              className="bg-[#ff4d8d] hover:opacity-90 text-white font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-pink-600/25 active:scale-95"
              style={{ fontFamily: JOST }}
            >
              Announce
            </button>
          </form>
        </div>

      </main>

      {/* 4. Fixed Bottom Controller Panel for easy mobile touch */}
      {!isLobby && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0e0108]/95 backdrop-blur-md z-40 max-w-md mx-auto shadow-2xl">
          <div className="space-y-3">
            {/* Status bar */}
            <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold" style={{ fontFamily: JOST }}>
              <span>Q{currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className={showAnswer ? 'text-green-400' : 'text-yellow-400'}>
                {showAnswer ? 'Answer Visible' : 'Answer Hidden'}
              </span>
            </div>

            {/* Main Action Controllers */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="py-3.5 px-1 bg-white/5 disabled:opacity-20 text-white text-center font-bold text-xs uppercase rounded-xl border border-white/10 cursor-pointer active:scale-95 transition-transform"
                style={{ fontFamily: JOST }}
              >
                ◀ Prev
              </button>
              
              <button
                onClick={toggleAnswer}
                className="py-3.5 px-1 text-center font-bold text-xs uppercase rounded-xl cursor-pointer active:scale-95 transition-all shadow-lg"
                style={{
                  fontFamily: JOST,
                  background: showAnswer ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ff4d8d, #ff6a3d)',
                  color: '#fff',
                  boxShadow: showAnswer ? '0 4px 10px rgba(16,185,129,0.2)' : '0 4px 10px rgba(255,77,141,0.2)'
                }}
              >
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="py-3.5 px-1 bg-white/5 disabled:opacity-20 text-[#F6C453] text-center font-bold text-xs uppercase rounded-xl border border-[#F6C453]/20 cursor-pointer active:scale-95 transition-transform"
                style={{ fontFamily: JOST }}
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}
  );
}
