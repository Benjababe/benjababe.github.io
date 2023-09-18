import { ForwardedRef } from 'react';
import ResumeEntry from './ResumeEntry';
import SkillsDisplay from './SkillsDisplay';

interface ExperienceProps {
  id: string;
  experienceRef: ForwardedRef<HTMLDivElement>;
}

const Experience = ({ id, experienceRef }: ExperienceProps) => {
  return (
    <section
      data-aos="fade-right"
      id={id}
      className="section"
      ref={experienceRef}
    >
      <h2>Experience</h2>
      <ResumeEntry
        dateRange="May 2023 - Aug 2023"
        title="Full-Stack Developer Intern"
      >
        <div className="resume-content">
          <p className="light-text">
            <a
              className="external"
              target="_blank"
              rel="noreferrer"
              href="https://aiseer.co"
            >
              Seer
            </a>{' '}
            | Singapore
          </p>
          <SkillsDisplay
            skills={[
              'Next.js',
              'NestJS',
              'ReactJS',
              'TailwindCSS',
              'Go',
              'gRPC',
              'Auth0',
              'MongoDB',
              'Python',
              'Azure',
              'Docker',
              'RabbitMQ',
              'C#',
              'WebRTC',
              'OpenAPI',
            ]}
          />
          <ul className="light-text">
            <li>
              Restructured existing in-house video processing modules and
              OpenAI&apos;s whisper model into gRPC/REST microservices.
            </li>
            <li>
              Constructed a pipeline for video upload and processing consisting
              of a Golang proxy server, ReactJS frontend and NestJS backend.
            </li>
            <li>
              Secured proper deployment of all web services on Azure Container
              Apps and Virtual Machine instances.
            </li>
            <li>
              Ensured proper documentation was written and code quality was
              maintained throughout all commits.
            </li>
          </ul>
        </div>
      </ResumeEntry>
      <ResumeEntry
        dateRange="May 2022 - Dec 2022"
        title="Full-Stack Developer Intern"
      >
        <div className="resume-content">
          <p className="light-text">
            <a
              className="external"
              target="_blank"
              rel="noreferrer"
              href="https://foodline.sg"
            >
              FoodLine.sg
            </a>{' '}
            | Singapore
          </p>
          <SkillsDisplay
            skills={['PHP', 'CSS', 'Javascript', 'MySQL', 'UNIX', 'jQuery']}
          />
          <ul className="light-text">
            <li>
              Built software for funds transfer from the company&apos;s bank
              accounts via FAST/Remittance as well as to receive notifications
              of incoming payments.
            </li>
            <li>
              Improved subscription functionality to support manual recharging
              of customers through Braintree.
            </li>
            <li>
              Multitude of improvements to internal pages, supporting 6
              departments, and external customer pages consisting of code speed
              up, general feature implementations and bug fixes.
            </li>
          </ul>
        </div>
      </ResumeEntry>
      <ResumeEntry dateRange="Apr 2016 - Sep 2016" title="Research Assistant">
        <div className="resume-content">
          <p className="light-text">
            <a
              className="external"
              target="_blank"
              rel="noreferrer"
              href="https://www.a-star.edu.sg/i2r"
            >
              Institute for Infocomm Research
            </a>{' '}
            | Singapore
          </p>
          <ul className="light-text">
            <li>
              Collaborated with 2 other developers to optimise call quality,
              speed and services massively over previous versions of the service
            </li>
            <li>
              Improved efficiency of JavaScript code on client&apos;s website to
              significantly reduce initial load times
            </li>
            <li>
              Created and maintained a MySQL database for ease of accessibility
              for archived chat logs and video recordings
            </li>
            <li>
              Converted web application code into a Java library for
              implementation for the Android application development
            </li>
          </ul>
        </div>
      </ResumeEntry>
    </section>
  );
};

export default Experience;
