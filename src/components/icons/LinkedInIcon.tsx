import linkedinIcon from "../../assets/images/icons/linkedin-icon.svg";

interface LinkedInIconProps {
    url: string;
}

const LinkedInIcon = ({ url }: LinkedInIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={linkedinIcon} alt="LinkedIn Icon"></img>
        </a>
    );
};

export default LinkedInIcon;