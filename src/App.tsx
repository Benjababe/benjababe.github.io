import { useState, useEffect, useRef } from 'react';
import './assets/styles/App.css';

import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Kuma, KumaWidget } from './components/Kuma';
import BackToTop from './components/BackToTop';
import { getTracker } from './utils/matomo';

import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [showKuma, setShowKuma] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const headerRefs = [
    { ref: aboutRef, name: 'about' },
    { ref: experienceRef, name: 'experience' },
    { ref: educationRef, name: 'education' },
    { ref: projectsRef, name: 'projects' },
  ];

  // Scroll-based SPA page view tracking
  useEffect(() => {
    const sectionTitles: Record<string, string> = {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      kuma: 'Kuma',
    };

    let lastTrack = 0;
    let lastSection = '';

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastTrack < 2000) return; // throttle to 2s

      // Find the most visible section
      let maxVisible = 0;
      let currentSection = '';

      for (const { ref } of headerRefs) {
        if (!ref.current) continue;
        const rect = ref.current.getBoundingClientRect();
        const visible =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visible > maxVisible && visible > 100) {
          maxVisible = visible;
          currentSection = ref.current.id;
        }
      }

      // Track when section changes
      if (currentSection && currentSection !== lastSection) {
        lastSection = currentSection;
        const title = sectionTitles[currentSection] || 'Home';
        document.title = `${title} – BenjaSite`;
        getTracker()?.trackPageView();
        lastTrack = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerRefs]);

  const trackEvent = (category: string, action: string, name?: string) => {
    getTracker()?.trackEvent(category, action, name);
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="app">
      <Header headerRefs={headerRefs} trackEvent={trackEvent} />
      <div>
        <KumaWidget
          showKuma={showKuma}
          setShowKuma={setShowKuma}
          trackEvent={trackEvent}
        />
        <About id="about" aboutRef={aboutRef} />
        <Kuma showKuma={showKuma} />
        <Experience id="experience" experienceRef={experienceRef} />
        <Education id="education" educationRef={educationRef} />
        <Projects
          id="projects"
          projectsRef={projectsRef}
          trackEvent={trackEvent}
        />
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
