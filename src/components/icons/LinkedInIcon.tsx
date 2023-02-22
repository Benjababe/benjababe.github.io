import liIcon from "../../assets/images/linkedin-icon.svg";

interface LinkedInIconProps {
    url: string;
}

const LinkedInIcon = ({ url }: LinkedInIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={liIcon} alt="LinkedIn Icon"></img>
        </a>
    );
};

export default LinkedInIcon;