import youtubeIcon from '../../assets/images/icons/youtube-icon.svg';

interface LinkIconProps {
  url: string;
}

const YouTubeIcon = ({ url }: LinkIconProps) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={youtubeIcon} alt="YouTube Icon"></img>
    </a>
  );
};

export default YouTubeIcon;
