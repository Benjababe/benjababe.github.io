import { ForwardedRef, memo, ReactElement, useRef, useState } from 'react';
import '../assets/styles/About.css';

import mugshot from '../assets/images/mugshot.webp';
import resume from '../assets/pdf/resume.pdf';

import GithubIcon from './icons/GithubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import ResumeIcon from './icons/ResumeIcon';
import PetContainer from './ReactPets/PetContainer';
import { PetType } from './ReactPets/BasePet';
import Pet from './ReactPets/Pet';
import DragDemo from './ReactPets/DragDemo';

interface AboutProps {
  id: string;
  aboutRef: ForwardedRef<HTMLDivElement>;
}

const About = ({ id, aboutRef }: AboutProps): ReactElement => {
  const mugshotRef = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(
    () => sessionStorage.getItem('petDemoSeen') !== 'true',
  );

  const handleDemoComplete = () => {
    setShowDemo(false);
    sessionStorage.setItem('petDemoSeen', 'true');
  };

  function getSubTitle() {
    const subtitles = [
      'Async jokes always Promise they will be good',
      'Constantly optimizing my code and occasionally, my life',
      "I shouldn't make backend jokes",
      'vi + me = random string generator',
    ];
    return subtitles[Math.floor(Math.random() * subtitles.length)];
  }

  return (
    <section id={id} className="section about" ref={aboutRef}>
      <div className="mugshot-container" ref={mugshotRef}>
        <img
          className="mugshot-img circle-dom"
          src={mugshot}
          alt="Mugshot Here"
        ></img>
        <PetContainer overlay={true}>
          <Pet
            petType={PetType.Cat}
            movementIntervalMs={5}
            stateUpdateIntervalMs={2500}
          />
          <Pet
            petType={PetType.Dog}
            movementIntervalMs={5}
            stateUpdateIntervalMs={3000}
          />
          <Pet
            petType={PetType.Bunny}
            movementIntervalMs={5}
            stateUpdateIntervalMs={6000}
          />
        </PetContainer>
        {showDemo && (
          <DragDemo containerRef={mugshotRef} onComplete={handleDemoComplete} />
        )}
      </div>
      <div className="desc-container">
        <h1 className="title-name">
          {'Benjamin '}
          <span className="title-alt">Goh</span>
        </h1>
        <h3>{getSubTitle()}</h3>
        <div className="sub-title plain-text">
          {'Singapore · '}
          <a href="mailto:bengohzy@gmail.com">bengohzy@gmail.com</a>
        </div>
        <p className="desc plain-text">
          {
            'Junior enthusiastic software developer who enjoys problem solving and creating solutions to ease my daily life.'
          }
          <br />
        </p>
      </div>
      <ul className="icon-container">
        <li className="icon">
          <GithubIcon url="https://github.com/Benjababe" />
        </li>
        <li className="icon">
          <LinkedInIcon url="https://www.linkedin.com/in/benjamin-goh-978201227/" />
        </li>
        <li className="icon">
          <ResumeIcon url={resume} />
        </li>
      </ul>
    </section>
  );
};

export default memo(About);
