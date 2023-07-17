import githubIcon from '../../assets/images/icons/github-icon.svg';

interface GithubIconProps {
  url: string;
}

const GithubIcon = ({ url }: GithubIconProps) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={githubIcon} alt="Github Icon"></img>
    </a>
  );
};

export default GithubIcon;
