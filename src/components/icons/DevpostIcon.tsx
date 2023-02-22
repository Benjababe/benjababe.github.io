import devpostIcon from "../../assets/images/devpost-icon.svg";

interface DevpostIconProps {
    url: string;
}

const DevpostIcon = ({ url }: DevpostIconProps) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <img src={devpostIcon} alt="Devpost Icon" style={{ background: "white" }}></img>
        </a>
    );
};

export default DevpostIcon;