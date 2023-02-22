import ytIcon from "../../assets/images/youtube-icon.svg";

interface LinkIconProps {
    url: string;
}

const YouTubeIcon = ({ url }: LinkIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={ytIcon} alt="YouTube Icon"></img>
        </a>
    );
};

export default YouTubeIcon;