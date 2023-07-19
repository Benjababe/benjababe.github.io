import { useState, useEffect, useRef } from 'react';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import './assets/styles/App.css';

import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Kuma, KumaWidget } from './components/Kuma';

import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [showKuma, setShowKuma] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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
      <Header
        aboutRef={aboutRef}
        educationRef={educationRef}
        experienceRef={experienceRef}
        projectsRef={projectsRef}
        trackEvent={trackEvent}
      />

      <div>
        <KumaWidget
          showKuma={showKuma}
          setShowKuma={setShowKuma}
          trackEvent={trackEvent}
        />
        <About id="about" aboutRef={aboutRef} />
        <Kuma showKuma={showKuma} />
        <Education id="education" educationRef={educationRef} />
        <Experience id="experience" experienceRef={experienceRef} />
        <Projects
          id="projects"
          projectsRef={projectsRef}
          trackEvent={trackEvent}
        />
      </div>
    </div>
  );
}

export default App;
