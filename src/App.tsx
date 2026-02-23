import { useState, useEffect, useRef } from 'react';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import './assets/styles/App.css';

import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Kuma, KumaWidget } from './components/Kuma';
import BackToTop from './components/BackToTop';

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

  const { trackPageView, trackEvent } = useMatomo();

  useEffect(() => {
    trackPageView();
  });

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
