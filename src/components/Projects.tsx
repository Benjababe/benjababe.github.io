import { useState, useRef, ForwardedRef } from "react";
import expandIcon from "../assets/images/icons/expand-icon.svg";
import ProjectEntries from "./ProjectEntries";

interface ProjectsProps {
    id: string;
    projectsRef: ForwardedRef<HTMLDivElement>;
}

const Projects = ({ id, projectsRef }: ProjectsProps) => {
    const [expandProjects, setExpandProjects] = useState(false);

    const toggleProjects = () => {
        setExpandProjects(!expandProjects);
    }

    return (
        <section id={id} className="section" ref={projectsRef}>
            <div className={`projects-container ${(expandProjects) ? "shown" : "hidden"}`}>
                <h2>Projects</h2>
                <ProjectEntries />
            </div>
            <div className={`expand-container ${(expandProjects) ? "" : "expand"}`}>
                <img
                    className={`img-expand ${(expandProjects) ? "contract" : ""}`}
                    onClick={toggleProjects}
                    src={expandIcon}
                    alt="Expand Icon" />
            </div>
        </section>
    );
};

export default Projects;