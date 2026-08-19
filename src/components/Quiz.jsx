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
      {
        id: 1,
        questionEn: "Who were the first foreigners to arrive in India?",
        questionMl: "ഇന്ത്യയിലേക്ക് ആദ്യമായി എത്തിയ വിദേശികൾ ആരാണ്?",
        answer: "Portuguese / പോർച്ചുഗീസുകാർ"
      },
      {
        id: 2,
        questionEn: "Vasco da Gama was a navigator from which country?",
        questionMl: "വാസ്കോ ഡ ഗാമ ഏത് രാജ്യത്തിന്റെ നാവികനായിരുന്നു?",
        answer: "Portugal / പോർച്ചുഗൽ"
      },
      {
        id: 3,
        questionEn: "Who was the first President of the Indian National Congress?",
        questionMl: "ഇന്ത്യൻ നാഷണൽ കോൺഗ്രസിന്റെ ആദ്യ പ്രസിഡന്റ് ആരായിരുന്നു?",
        answer: "Womesh Chandra Bonnerjee / വോമേഷ് ചന്ദ്ര ബോണർജി"
      },
      {
        id: 4,
        questionEn: "Who is the founder of the Cockroach Janta Party (CJP)?",
        questionMl: "Cockroach Janta Party (CJP) യുടെ സ്ഥാപകൻ ആര്?",
        answer: "Abhijeet Dipke / അഭിജീത് ദിപ്കെ"
      },
      {
        id: 5,
        questionEn: "In which year did the First War of Independence in India take place?",
        questionMl: "ഇന്ത്യയിലെ ഒന്നാം സ്വാതന്ത്ര്യസമരം നടന്നത് ഏത് വർഷമാണ്?",
        answer: "1857"
      },
      {
        id: 6,
        questionEn: "Which is the largest state in India by area?",
        questionMl: "വിസ്തൃതി കൊണ്ട് ഇന്ത്യയിലെ ഏറ്റവും വലിയ സംസ്ഥാനം ഏതാണ്?",
        answer: "Rajasthan / രാജസ്ഥാൻ"
      },
      {
        id: 7,
        questionEn: "Which space mission made India the first country to land near the Moon's south pole?",
        questionMl: "ചന്ദ്രന്റെ ദക്ഷിണ ധ്രുവത്തിൽ ആദ്യമായി ഇറങ്ങിയ രാജ്യമെന്ന ബഹുമതി ഇന്ത്യക്ക് ലഭിച്ചത് ഏത് ദൗത്യത്തിലൂടെ?",
        answer: "Chandrayaan-3 / ചന്ദ്രയാൻ-3"
      },
      {
        id: 8,
        questionEn: "What is the name of the alcohol blended with petrol in the E20 petrol currently available in India?",
        questionMl: "നിലവിൽ ഇന്ത്യയിൽ പുറത്തിറങ്ങുന്ന E20 പെട്രോളിൽ കലർത്തുന്ന ആൽക്കഹോളിന്റെ പേര് എന്താണ്?",
        answer: "Ethanol / എത്തനോൾ"
      },
      {
        id: 9,
        questionEn: "Where does the Prime Minister hoist the Indian national flag on Independence Day?",
        questionMl: "സ്വാതന്ത്ര്യദിനത്തിൽ പ്രധാനമന്ത്രി ഇന്ത്യയുടെ ദേശീയപതാക ഉയർത്തുന്നത് എവിടെയാണ്?",
        answer: "Red Fort, Delhi / ചെങ്കോട്ട, ഡൽഹി"
      },
      {
        id: 10,
        questionEn: "In which year, month and date did India become a Republic?",
        questionMl: "ഇന്ത്യ റിപ്പബ്ലിക്കായ വർഷം, മാസം, തീയതി ഏതാണ്?",
        answer: "26 January 1950 / 1950 ജനുവരി 26"
      }
    ]
  },
  {
    roundName: "2nd Round – രണ്ടാം റൗണ്ട്",
    questions: [
      {
        id: 1,
        questionEn: "What was the name of the company established by the British in India?",
        questionMl: "ഇന്ത്യയിൽ ബ്രിട്ടീഷുകാർ സ്ഥാപിച്ച കമ്പനിയുടെ പേര് എന്താണ്?",
        answer: "East India Company / ഈസ്റ്റ് ഇന്ത്യാ കമ്പനി"
      },
      {
        id: 2,
        questionEn: "Whose slogan was “Do or Die”?",
        questionMl: "“പ്രവർത്തിക്കുക അല്ലെങ്കിൽ മരിക്കുക” ആരുടെ മുദ്രാവാക്യമായിരുന്നു?",
        answer: "Mahatma Gandhi / മഹാത്മാ ഗാന്ധി"
      },
      {
        id: 3,
        questionEn: "Who was the first Education Minister of India?",
        questionMl: "ഇന്ത്യയുടെ ആദ്യത്തെ വിദ്യാഭ്യാസ മന്ത്രിയുടെ പേര് എന്താണ്?",
        answer: "Maulana Abul Kalam Azad / മൗലാന അബുൽ കലാം ആസാദ്"
      },
      {
        id: 4,
        questionEn: "Which river is known as the 'Sorrow of Bengal'?",
        questionMl: "ഏത് നദിയാണ് 'ബംഗാളിന്റെ ദുഃഖം' എന്ന് അറിയപ്പെടുന്നത്?",
        answer: "Damodar River / ദാമോദർ നദി"
      },
      {
        id: 5,
        questionEn: "Which country is the largest producer of milk in the world?",
        questionMl: "ലോകത്ത് ഏറ്റവും കൂടുതൽ പാൽ ഉൽപ്പാദിപ്പിക്കുന്ന രാജ്യം ഏതാണ്?",
        answer: "India / ഇന്ത്യ"
      },
      {
        id: 6,
        questionEn: "Rabindranath Tagore, who wrote India's National Anthem, also wrote the National Anthem of another country. Which country is it?",
        questionMl: "ഇന്ത്യയുടെ ദേശീയഗാനം രചിച്ച രവീندرനാഥ ടാഗോർ മറ്റൊരു രാജ്യത്തിന്റെ ദേശീയഗാനവും രചിച്ചിട്ടുണ്ട്. ഏത് രാജ്യത്തിന്റേതാണ് അത്?",
        answer: "Bangladesh / ബംഗ്ലാദേശ്"
      },
      {
        id: 7,
        questionEn: "Where is the official place where the Indian national flag is manufactured?",
        questionMl: "ഇന്ത്യയുടെ ദേശീയപതാക ഔദ്യോഗികമായി നിർമ്മിക്കുന്ന സ്ഥലം എവിടെയാണ്?",
        answer: "KKGSS, Hubli / ഹൂബ്ലി (കർണാടക ഖാദി ഗ്രാമോദ്യോഗ സംയുക്ത സംഘം)"
      },
      {
        id: 8,
        questionEn: "Which is the longest river entirely within India?",
        questionMl: "പൂർണ്ണമായും ഇന്ത്യക്ക് ഉള്ളിലൂടെ ഒഴുകുന്ന ഏറ്റവും നീളമേറിയ നദി ഏതാണ്?",
        answer: "Godavari / ഗോദാവരി"
      },
      {
        id: 9,
        questionEn: "Who was the first person to receive the Bharat Ratna award?",
        questionMl: "ഭാരതരത്നം പുരസ്കാരം ആദ്യമായി ലഭിച്ചത് ആർക്കാണ്?",
        answer: "C. Rajagopalachari / സി. രാജഗോപാലാചാരി"
      },
      {
        id: 10,
        questionEn: "Who was India's first woman Prime Minister?",
        questionMl: "ഇന്ത്യയുടെ ആദ്യത്തെ വനിതാ പ്രധാനമന്ത്രി ആരായിരുന്നു?",
        answer: "Indira Gandhi / ഇന്ദിരാ ഗാന്ധി"
      }
    ]
  },
  {
    roundName: "3rd Round – മൂന്നാം റൗണ്ട്",
    questions: [
      {
        id: 1,
        questionEn: "Which Indian Education Minister resigned following the protest by the Cockroach Janta Party (CJP)?",
        questionMl: "Cockroach Janta Party (CJP) യുടെ സമരത്തെ തുടർന്ന് രാജിവെച്ച ഇന്ത്യയുടെ വിദ്യാഭ്യാസ മന്ത്രി ആരായിരുന്നു?",
        answer: "Will be revealed by the Quiz Master / ക്വിസ് മാസ്റ്റർ വെളിപ്പെടുത്തും"
      },
      {
        id: 2,
        questionEn: "What was the name of the ship on which Vasco da Gama first arrived in India?",
        questionMl: "വാസ്കോ ഡ ഗാമ ഇന്ത്യയിലേക്ക് ആദ്യമായി എത്തിയ കപ്പലിന്റെ പേര് എന്തായിരുന്നു?",
        answer: "São Gabriel / സാവോ ഗബ്രിയേൽ"
      },
      {
        id: 3,
        questionEn: "How many members does the Rajya Sabha have in total?",
        questionMl: "രാജ്യസഭയിൽ ആകെ എത്ര അംഗങ്ങൾ ഉണ്ട്?",
        answer: "245 / 245"
      },
      {
        id: 4,
        questionEn: "Which is the highest peak in South India?",
        questionMl: "ദക്ഷിണേന്ത്യയിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി ഏതാണ്?",
        answer: "Anamudi / ആനമുടി"
      },
      {
        id: 5,
        questionEn: "Who is known as the 'Father of the Indian Constitution'?",
        questionMl: "ഇന്ത്യൻ ഭരണഘടനയുടെ 'പിതാവ്' എന്ന് അറിയപ്പെടുന്നത് ആരാണ്?",
        answer: "Dr. B. R. Ambedkar / ഡോ. ബി. ആർ. അംബേദ്കർ"
      }
    ]
  }
];

export default function Quiz() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [announcedWinner, setAnnouncedWinner] = useState('');

  // Check authentication in sessionStorage
  useEffect(() => {
    const isAuth = sessionStorage.getItem('quiz_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Poll active quiz state from backend when authenticated
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
        .catch(err => console.error('Error fetching quiz state:', err));
    };

    fetchState(); // Initial fetch
    const interval = setInterval(fetchState, 1000); // Poll every 1s
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessCode === '5626') {
      sessionStorage.setItem('quiz_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('quiz_authenticated');
    setIsAuthenticated(false);
    setAccessCode('');
    setCurrentRoundIndex(0);
    setCurrentQuestionIndex(-1);
    setShowAnswer(false);
    setAnnouncedWinner('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(25, 4, 15, 0.95) 0%, rgba(14, 1, 8, 0.98) 100%)',
            backdropFilter: 'blur(28px)',
          }}
        >
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #ff4d8d 0%, transparent 70%)', filter: 'blur(30px)' }}
          />

          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold tracking-wider"
              style={{
                fontFamily: CORMORANT,
                background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ArtX'26 Quiz
            </h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-2" style={{ fontFamily: JOST }}>
              Presentation Screen
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
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
              className="w-full bg-gradient-to-r from-accent-pink to-accent-orange text-white rounded-full py-3.5 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-accent-pink/20"
              style={{
                fontFamily: JOST,
                background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)',
              }}
            >
              Open Presentation Screen
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (announcedWinner) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-40 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,179,71,0.2) 0%, transparent 80%)',
          }}
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-center space-y-8 z-10 px-4"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
            className="inline-block text-[#ffb347] text-6xl md:text-8xl"
          >
            🏆
          </motion.div>
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#ff4d8d] tracking-[0.4em] uppercase" style={{ fontFamily: JOST }}>
              ArtX'26 Quiz Winner
            </span>
            <h1
              className="text-6xl md:text-8xl font-black uppercase tracking-wider py-4"
              style={{
                fontFamily: CORMORANT,
                background: 'linear-gradient(135deg, #FFF 20%, #F6C453 50%, #ff6a3d 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(246,196,83,0.3)',
              }}
            >
              {announcedWinner}
            </h1>
          </div>

          <p className="text-sm text-white/50 tracking-widest uppercase" style={{ fontFamily: JOST }}>
            Congratulations on the grand victory!
          </p>
        </motion.div>
      </div>
    );
  }

  const currentRound = quizData[currentRoundIndex];
  const totalQuestions = currentRound?.questions.length ?? 0;
  const isLobby = currentQuestionIndex === -1;
  const currentQuestion = !isLobby && currentRound ? currentRound.questions[currentQuestionIndex] : null;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
      <div
        className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,179,71,0.2) 0%, transparent 75%)', filter: 'blur(50px)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.2) 0%, transparent 75%)', filter: 'blur(50px)' }}
      />

      <header className="relative z-10 w-full px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold tracking-wider" style={{ fontFamily: CORMORANT, color: '#F6C453' }}>
            ArtX'26
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-xs uppercase tracking-widest text-white/60" style={{ fontFamily: JOST }}>Quiz Program</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
          style={{ fontFamily: JOST }}
        >
          Exit Screen
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 z-10">
        <AnimatePresence mode="wait">
          {isLobby ? (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="w-full max-w-4xl text-center space-y-8 py-12"
            >
              <div>
                <span className="text-[10px] text-[#ffb347] uppercase font-bold tracking-[0.4em]" style={{ fontFamily: JOST }}>
                  ArtX'26 Presentation Screen
                </span>
                <h1
                  className="text-5xl md:text-7xl font-bold tracking-wider mt-4"
                  style={{
                    fontFamily: CORMORANT,
                    background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Quiz Program
                </h1>
              </div>

              <div className="p-8 rounded-2xl border border-white/5 max-w-md mx-auto" style={{ background: 'rgba(14, 1, 8, 0.6)', backdropFilter: 'blur(20px)' }}>
                <p className="text-white/70 text-sm font-medium tracking-wide animate-pulse" style={{ fontFamily: JOST }}>
                  Waiting for the Quiz Master to start the round...
                </p>
              </div>
            </motion.div>
          ) : (
            currentQuestion && (
              <motion.div
                key={`${currentRoundIndex}-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl flex flex-col items-center text-center space-y-8"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-[#ffb347] uppercase font-bold tracking-[0.3em]" style={{ fontFamily: JOST }}>
                    {currentRound.roundName}
                  </span>
                  <h2 className="text-white/60 font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: JOST }}>
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </h2>
                </div>

                <div
                  className="w-full p-8 md:p-14 rounded-3xl border border-white/10 flex flex-col justify-center min-h-[380px] relative overflow-hidden"
                  style={{ background: 'rgba(14, 1, 8, 0.85)', backdropFilter: 'blur(30px)' }}
                >
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/5 rounded-2xl pointer-events-none" />

                  <div className="space-y-8 relative z-10 py-6">
                    <p
                      className="text-3xl md:text-5xl text-white font-medium leading-relaxed tracking-wide"
                      style={{ fontFamily: CORMORANT }}
                    >
                      "{currentQuestion.questionEn}"
                    </p>
                    
                    <p
                      className="text-2xl md:text-3xl text-[#E8D9DD] font-semibold leading-relaxed"
                      style={{ fontFamily: JOST }}
                    >
                      {currentQuestion.questionMl}
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center min-h-[80px]">
                  <AnimatePresence mode="wait">
                    {showAnswer && (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-2xl px-8 py-3.5 shadow-lg shadow-green-500/5"
                      >
                        <p className="text-green-400 font-bold text-xl md:text-2xl" style={{ fontFamily: JOST }}>
                          {currentQuestion.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
