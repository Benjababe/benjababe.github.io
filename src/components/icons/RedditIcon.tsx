import redditIcon from "../../assets/images/reddit-icon.svg";

interface RedditIconProps {
    url: string;
}

const RedditIcon = ({ url }: RedditIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={redditIcon} alt="Reddit Icon" style={{ backgroundColor: "white" }}></img>
        </a>
    );
};

export default RedditIcon;