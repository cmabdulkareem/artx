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

function AppContent() {
  const location = useLocation();
  const isLiveResults = location.pathname === '/live-results';

  return (
    <div className="relative">
      {!isLiveResults && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<> <Hero /> <About /> <Events /> <Rules /> <Points /> </> } />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/points" element={<Points />} />
          <Route path="/live-results" element={<LiveResults />} />
        </Routes>
      </main>
      {!isLiveResults && <Footer />}
      {!isLiveResults && <MusicController />}
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