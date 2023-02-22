import { ForwardedRef } from "react";
import ProjectEntry from "./ProjectEntry";
import GithubIcon from "./icons/GithubIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
import LinkIcon from "./icons/LinkIcon";
import DevpostIcon from "./icons/DevpostIcon";

interface ProjectsProps {
    id: string;
    projectsRef: ForwardedRef<HTMLDivElement>;
}

const Projects = ({ id, projectsRef }: ProjectsProps) => {
    return (
        <section id={id} className="section" ref={projectsRef}>
            <h2>Projects</h2>
            <ProjectEntry
                name="CPP Video to ASCII"
                type="CLI Application"
                skills={["C++", "CMake", "OpenCV"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/CPP-Video-to-ASCII" />
                    </li>
                    <li className="icon project-icon">
                        <YouTubeIcon url="https://www.youtube.com/watch?v=H09VKJ3H3Lk" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Developed a CLI application that converts videos into an ASCII output on your terminal.</li>
                    <li>Allows frames to be displayed by writing to the output buffer or the console buffer directly.</li>
                    <li>Supports reduced colour switching and reduced framerates to optimise frame printing times.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="Multiplayer Self Driving Playground"
                type="Web Game"
                skills={["NodeJS", "ExpressJS", "JWT", "Socket.IO"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/HackNRoll-2023" />
                    </li>
                    <li className="icon project-icon">
                        <DevpostIcon url="https://devpost.com/software/2d-multiplayer-self-driving-playground" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Project made during Hack&Roll 2023.</li>
                    <li>Developed a web game with a friend where players can train their own self driving neural network and compete with others.</li>
                    <li>Worked on the backend, all communications between client & server.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="Buldog Playsound Bot"
                type="Online Bot"
                skills={["NodeJS", "FFMPEG"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/Buldog-Playsound-Bot" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Developed a web scraper to pull several pages periodically to retrieve command strings and audio files.</li>
                    <li>Integrated FFMPEG to allow concatenation of multiple audio files as well as manipulating their playback rates.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="WebM Widener"
                type="Recreational Tool"
                skills={["Python", "LibVPX", "Pillow"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/WebM-Widener" />
                    </li>
                    <li className="icon project-icon">
                        <LinkIcon url="https://webm.red/view/VnUz.webm" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Developed a program which converts either an image or video into a webm video of varying resolution.</li>
                    <li>Users are able to select either one of 2 encoding options, VP8 or VP9.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="IPGeoGuessr"
                type="Web Game"
                skills={["HTML", "JS", "CSS"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/IPGeoGuessr" />
                    </li>
                    <li className="icon project-icon">
                        <DevpostIcon url="https://devpost.com/software/ipgeoguessr" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Project made for iNTUition v8.0.</li>
                    <li>Developed a web game with a group based off the existing popular game GeoGuessr.</li>
                    <li>Players try to guess the physical location of the ISP for a given IP Address.</li>
                    <li>Hints for the IP Address relating to its ISP location will be given to the user.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="Not Rosa Musou"
                type="Web Game"
                skills={["C#", "Unity"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/NotRosaMusou" />
                    </li>
                    <li className="icon project-icon">
                        <LinkIcon url="https://benjababe.itch.io/not-rosa-musou" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Developed a web game based off "Umineko no Naku Koro ni" where users try to survive as long as possible in a side scrolling shooter.</li>
                    <li>Project was made within my first 24 hours of being exposed to Unity.</li>
                </ul>
            </ProjectEntry>
            <ProjectEntry
                name="2D MultiAI Playground"
                type="Multiplayer Game"
                skills={["Python", "Socket.IO", "Pygame"]} >
                <ul className="icon-container project-icon-container">
                    <li className="icon project-icon">
                        <GithubIcon url="https://github.com/Benjababe/HackNRoll-2022" />
                    </li>
                    <li className="icon project-icon">
                        <DevpostIcon url="https://devpost.com/software/hacknroll-2022" />
                    </li>
                </ul>
                <ul className="project-desc">
                    <li>Project made for Hack&Roll 2022. Won Top 8 in no particular order</li>
                    <li>Developed a multiplayer game in a group where players train their own self moving and shooting character and compete with others</li>
                    <li>Worked on all of the game assets, physics and the backend</li>
                </ul>
            </ProjectEntry>
        </section>
    );
};

export default Projects;