import ScrollContainer from 'react-indiana-drag-scroll';
import SkillIcon from './icons/SkillIcon';
import { useEffect, useRef } from 'react';

interface SkillsProps {
  skills: string[];
}

const SkillsDisplay = ({ skills }: SkillsProps) => {
  let animatedOnce = false;
  const skillContainerRef = useRef<HTMLElement>(null);

  function previewSkills() {
    const elem = skillContainerRef.current;
    if (elem.scrollWidth <= elem.clientWidth) {
      return;
    }

    setTimeout(() => {
      elem.scrollTo({
        left: elem.scrollWidth,
        behavior: 'smooth',
      });
      setTimeout(() => {
        elem.scrollTo({ left: 0, behavior: 'smooth' });
      }, 1500);
    }, 1000);
  }

  // When the skill block can be seen, scroll it to let
  // user know it can be scrolled and isn't just clipping
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animatedOnce) {
        previewSkills();
        animatedOnce = true;
      }
    });
    observer.observe(skillContainerRef.current);
  }, []);

  // sort skill alphabetically first
  // then get the skill image
  const imgArr = skills
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((skill, i) => {
      return <SkillIcon key={`skill-${i}`} name={skill} />;
    });

  return (
    <ScrollContainer
      className="skill-container"
      horizontal={true}
      innerRef={skillContainerRef}
    >
      <ul className="skill-list light-text" aria-label="Skills">
        <li className="skill-block">{imgArr}</li>
      </ul>
    </ScrollContainer>
  );
};

export default SkillsDisplay;
