import { ForwardedRef } from 'react';
import '../assets/styles/About.css';

import mugshot from '../assets/images/mugshot.jpg';
import resume from '../assets/pdf/resume.pdf';

import GithubIcon from './icons/GithubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import ResumeIcon from './icons/ResumeIcon';
import PetContainer from './ReactPets/PetContainer';

interface AboutProps {
  id: string;
  aboutRef: ForwardedRef<HTMLDivElement>;
}

const About = ({ id, aboutRef }: AboutProps) => {
  return (
    <section id={id} className="section about" ref={aboutRef}>
      <div className="mugshot-container">
        <img
          className="mugshot-img circle-dom"
          src={mugshot}
          alt="Mugshot Here"
        ></img>
      </div>
      <PetContainer overlay={false} />
      <div className="desc-container">
        <h1 className="title-name">
          {'Benjamin '}
          <span className="title-alt">Goh</span>
        </h1>
        <h3>Aspiring Full-Stack Developer</h3>
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

export default About;
