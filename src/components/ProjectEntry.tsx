import { ReactNode } from 'react';
import '../assets/styles/App.css';
import SkillsDisplay from './SkillsDisplay';

interface ProjectEntryProps {
  name: string;
  type: string;
  skills: Array<string>;
  children: ReactNode;
}

const ProjectEntry = ({ name, type, skills, children }: ProjectEntryProps) => {
  return (
    <div className="resume-entry project-entry">
      <div className="project-entry-header">
        <h3>{name}</h3>
        <div className="light-text">
          {type}
          <br />
          <SkillsDisplay skills={skills} />
        </div>
      </div>
      <div className="project-entry-info light-text">{children}</div>
    </div>
  );
};

export default ProjectEntry;
