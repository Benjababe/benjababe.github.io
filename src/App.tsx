import { useState, useRef } from 'react';
import './assets/styles/App.css';

import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { Kuma, KumaWidget } from "./components/Kuma";


function App() {
    const [showKuma, setShowKuma] = useState(false);

    const aboutRef = useRef<HTMLDivElement>(null),
        educationRef = useRef<HTMLDivElement>(null),
        experienceRef = useRef<HTMLDivElement>(null),
        projectsRef = useRef<HTMLDivElement>(null);

    return (
        <div className="app">
            <Header
                aboutRef={aboutRef}
                educationRef={educationRef}
                experienceRef={experienceRef}
                projectsRef={projectsRef} />

            <div>
                <KumaWidget showKuma={showKuma} setShowKuma={setShowKuma} />
                <About id="about" aboutRef={aboutRef} />
                <Kuma showKuma={showKuma} />
                <Education id="education" educationRef={educationRef} />
                <Experience id="experience" experienceRef={experienceRef} />
                <Projects id="projects" projectsRef={projectsRef} />
            </div>
        </div>
    );
}

export default App;
