import ghIcon from "../../assets/images/github-icon.svg";

interface GithubIconProps {
    url: string;
}

const GithubIcon = ({ url }: GithubIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={ghIcon} alt="Github Icon"></img>
        </a>
    );
};

export default GithubIcon;