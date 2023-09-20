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
    setTimeout(() => {
      skillContainerRef.current.scrollTo({
        left: skillContainerRef.current.scrollWidth / 2,
        behavior: 'smooth',
      });
      console.dir(skillContainerRef.current);
      setTimeout(() => {
        skillContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
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
    <div className="light-text">
      <ScrollContainer
        className="skill-container"
        horizontal={true}
        innerRef={skillContainerRef}
      >
        <div className="skill-description">{skills.join(' ')}</div>
        <div className="skill-block">{imgArr}</div>
      </ScrollContainer>
    </div>
  );
};

export default SkillsDisplay;
