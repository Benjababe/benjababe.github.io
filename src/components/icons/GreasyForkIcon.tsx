import greasyForkIcon from '../../assets/images/icons/greasyfork-icon.svg';

interface GreasyForkIconProps {
  url: string;
}

const GreasyForkIcon = ({ url }: GreasyForkIconProps) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={greasyForkIcon} alt="GreasyFork Icon"></img>
    </a>
  );
};

export default GreasyForkIcon;
