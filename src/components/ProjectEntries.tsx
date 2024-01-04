import ProjectEntry from './ProjectEntry';
import GithubIcon from './icons/GithubIcon';
import YouTubeIcon from './icons/YouTubeIcon';
import LinkIcon from './icons/LinkIcon';
import DevpostIcon from './icons/DevpostIcon';

const ProjectEntries = () => {
  return (
    <>
      <ProjectEntry
        name="GenericMangoDownloader"
        type="CLI Application"
        skills={['Python', 'unittest']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/GenericMangoDownloader" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>
            Developed a CLI aggregate manga downloader with site specific
            features.
          </li>
          <li>
            Implemented publicly available APIs and a web scraper to retrieve
            information for image downloads.
          </li>
          <li>
            Constructed a modular system where extensions for additional
            websites can be written and integrated seamlessly.
          </li>
          <li>
            Reverse engineered websites&apos; JavaScript to include features not
            easily accessible to the average user.
          </li>
          <li>
            Wrote a plentiful amount of unit tests to show, specifically, which
            features of which extension are currently not working.
          </li>
        </ul>
      </ProjectEntry>
      <ProjectEntry
        name="NTUMoons"
        type="Web Application"
        skills={['SvelteKit', 'Vercel', 'Firebase', 'Typesense', 'Python']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/NTUMoons" />
          </li>
          <li className="icon project-icon">
            <LinkIcon url="https://ntumoons.vercel.app" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>
            Online web portal for NTU students to plan modules and view general
            school information.
          </li>
          <li>
            Scrapes NTU webpages for information about modules, venues and staff
            which is stored in Firebase.
          </li>
          <li>
            Allow users to add modules to a timetable on a per semester basis
            and has a built in timetable generator to find compatible lesson
            timings.
          </li>
          <li>
            Utilised Typesense for indexing of module and staff documents for
            text based search queries and filters.
          </li>
          <li>
            Implemented internationalisation to provide a more inclusive user
            experiences for multiple languages.
          </li>
        </ul>
      </ProjectEntry>
      <ProjectEntry
        name="Terminal Vidya Player"
        type="CLI Application"
        skills={['C++', 'CMake', 'OpenCV', 'FFmpeg']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/term-video" />
          </li>
          <li className="icon project-icon">
            <YouTubeIcon url="https://www.youtube.com/watch?v=H09VKJ3H3Lk" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>
            CLI application that plays video as an ASCII output in the terminal
            utilising Win32 API and ncurses.
          </li>
          <li>
            Allow frames to be displayed by either printing normally or writing
            directly to the console buffer.
          </li>
          <li>
            Printing optimisation with reduced colour switching and lowered
            frame rates to mitigate dropped frames.
          </li>
          <li>
            Supports audio playback with preferred audio language selection.
          </li>
        </ul>
      </ProjectEntry>
      <ProjectEntry
        name="2D MultiAI Playground"
        type="Multiplayer Game"
        skills={['Python', 'Socket.IO', 'Pygame']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/HackNRoll-2022" />
          </li>
          <li className="icon project-icon">
            <DevpostIcon url="https://devpost.com/software/hacknroll-2022" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>Project made for Hack&Roll 2022.</li>
          <li>🏆 Won Top 8 in no particular order.</li>
          <li>
            Developed a multiplayer game in a group where players train their
            own self moving and shooting character and compete with others.
          </li>
          <li>Worked on all of the game assets, physics and the backend.</li>
        </ul>
      </ProjectEntry>
      <ProjectEntry
        name="Multiplayer Self Driving Playground"
        type="Web Game"
        skills={['NodeJS', 'ExpressJS', 'JWT', 'Socket.IO']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/HackNRoll-2023" />
          </li>
          <li className="icon project-icon">
            <DevpostIcon url="https://devpost.com/software/2d-multiplayer-self-driving-playground" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>Project made for Hack&Roll 2023.</li>
          <li>
            Developed a web game with a friend where players can train their own
            self driving neural network and compete with others.
          </li>
          <li>
            Worked on the backend, all communications between client & server.
          </li>
        </ul>
      </ProjectEntry>
      <ProjectEntry
        name="WebM Widener"
        type="Recreational Tool"
        skills={['Python', 'FFmpeg', 'Pillow']}
      >
        <ul className="icon-container project-icon-container">
          <li className="icon project-icon">
            <GithubIcon url="https://github.com/Benjababe/WebM-Widener" />
          </li>
          <li className="icon project-icon">
            <LinkIcon url="https://webm.red/view/VnUz.webm" />
          </li>
        </ul>
        <ul className="project-desc">
          <li>
            Developed a program which converts either an image or video into a
            webm video of varying resolution.
          </li>
          <li>
            Users are able to select either one of 2 encoding options, VP8 or
            VP9.
          </li>
        </ul>
      </ProjectEntry>
    </>
  );
};

export default ProjectEntries;
