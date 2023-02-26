import linkIcon from "../../assets/images/icons/link-icon.svg";

interface LinkIconProps {
    url: string;
}

const LinkIcon = ({ url }: LinkIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={linkIcon} alt="Generic Link Icon" style={{ backgroundColor: "white" }}></img>
        </a>
    );
};

export default LinkIcon;