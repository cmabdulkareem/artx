import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Rules from './components/Rules';
import Points from './components/Points';
import Footer from './components/Footer';
import MusicController from './components/MusicController';
import LiveResults from './components/LiveResults';
import Quiz from './components/Quiz';
import QuizMaster from './components/QuizMaster';
import MemoryChallenge from './components/MemoryChallenge';
import MemoryMaster from './components/MemoryMaster';

function AppContent() {
  const location = useLocation();
  const isCleanPage = ['/live-results', '/quiz', '/quiz-master', '/memory-challenge', '/memory-master'].includes(location.pathname);

  return (
    <div className="relative">
      {!isCleanPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<> <Hero /> <About /> <Events /> <Rules /> <Points /> </> } />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/points" element={<Points />} />
          <Route path="/live-results" element={<LiveResults />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-master" element={<QuizMaster />} />
          <Route path="/memory-challenge" element={<MemoryChallenge />} />
          <Route path="/memory-master" element={<MemoryMaster />} />
        </Routes>
      </main>
      {!isCleanPage && <Footer />}
      {!isCleanPage && <MusicController />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;