interface SkillsProps {
    skills: string[];
}

const SkillsDisplay = ({ skills }: SkillsProps) => {
    return (
        <div className="light-text" style={{ display: "inline-flex" }}>
            <div>Skills:</div>
            <div style={{ marginLeft: "0.75rem" }}>
                {skills.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join(", ")}
            </div>
        </div>
    )
}

export default SkillsDisplay;