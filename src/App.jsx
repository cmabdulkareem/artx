import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Rules from './components/Rules';
import Points from './components/Points';
import Footer from './components/Footer';
import MusicController from './components/MusicController';

function AppContent() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<> <Hero /> <About /> <Events /> <Rules /> <Points /> </> } />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/points" element={<Points />} />
        </Routes>
      </main>
      <Footer />
      <MusicController />
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