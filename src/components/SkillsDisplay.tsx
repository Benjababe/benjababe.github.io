import SkillIcon from './icons/SkillIcon';

interface SkillsProps {
  skills: string[];
}

const SkillsDisplay = ({ skills }: SkillsProps) => {
  // sort skill alphabetically first
  // then get the skill image
  const imgArr = skills
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((skill, i) => {
      return <SkillIcon key={`skill-${i}`} name={skill} />;
    });

  return (
    <div className="light-text">
      <div className="skill-block">
        <div className="skill-description">{skills.join(' ')}</div>
        {imgArr}
      </div>
    </div>
  );
};

export default SkillsDisplay;
