import resumeIcon from "../../assets/images/resume-icon.svg";

interface ResumeIconProps {
    url: string;
}

const ResumeIcon = ({ url }: ResumeIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={resumeIcon} alt="Resume Icon" style={{ background: "white" }}></img>
        </a>
    );
};

export default ResumeIcon;