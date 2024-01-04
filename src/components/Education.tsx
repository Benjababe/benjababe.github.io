import { ForwardedRef } from 'react';
import ResumeEntry from './ResumeEntry';

interface EducationProps {
  id: string;
  educationRef: ForwardedRef<HTMLDivElement>;
}

const Education = ({ id, educationRef }: EducationProps) => {
  return (
    <section
      data-aos="fade-left"
      id={id}
      className="section"
      ref={educationRef}
    >
      <h2>Education</h2>
      <ResumeEntry
        title="Bachelor of Engineering"
        dateRange="Aug 2020 - Dec 2023"
      >
        <div className="resume-content">
          <p className="light-text">
            Nanyang Technological University | Singapore
          </p>
          <p className="light-text">Computer Science</p>
        </div>
      </ResumeEntry>
      <ResumeEntry title="Diploma" dateRange="Apr 2014 - Apr 2017">
        <div className="resume-content">
          <p className="light-text">Temasek Polytechnic | Singapore</p>
          <p className="light-text">Computer Engineering</p>
        </div>
      </ResumeEntry>
    </section>
  );
};

export default Education;
