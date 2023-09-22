import { useState, ForwardedRef } from 'react';
import { TrackEventParams } from '@jonkoops/matomo-tracker-react/lib/types';
import expandIcon from '../assets/images/icons/expand-icon.svg';
import ProjectEntries from './ProjectEntries';

interface ProjectsProps {
  id: string;
  projectsRef: ForwardedRef<HTMLDivElement>;
  trackEvent: (param: TrackEventParams) => void;
}

const Projects = ({ id, projectsRef, trackEvent }: ProjectsProps) => {
  const [expandProjects, setExpandProjects] = useState(false);

  const toggleProjects = () => {
    setExpandProjects(!expandProjects);

    trackEvent({
      category: 'self-projects',
      action: 'click-toggle',
      name: expandProjects ? 'contract' : 'expand',
    });
  };

  return (
    <section
      data-aos="fade-right"
      id={id}
      className="section"
      ref={projectsRef}
    >
      <div
        className={`projects-container ${expandProjects ? 'shown' : 'hidden'}`}
      >
        <h2>Projects</h2>
        <ProjectEntries />
      </div>
      <div className={`expand-container ${expandProjects ? '' : 'expand'}`}>
        <img
          className={`img-expand ${expandProjects ? 'contract' : ''}`}
          onClick={toggleProjects}
          src={expandIcon}
          alt="Expand Icon"
        />
      </div>
    </section>
  );
};

export default Projects;
