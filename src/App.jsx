import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Timeline from './components/Timeline';
import Rules from './components/Rules';
import Points from './components/Points';
import RegisterCTA from './components/RegisterCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicController from './components/MusicController';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Timeline />
        <Rules />
        <Points />
        <RegisterCTA />
        <Contact />
      </main>
      <Footer />
      <MusicController />
    </div>
  );
}

export default App;