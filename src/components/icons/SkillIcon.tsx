import * as SkillIcons from '../../assets/images/icons/skills';

interface Skill {
  name: string[];
  src: string;
  text: string;
}

interface SkillIconProps {
  name: string;
}

const skills: Skill[] = [
  {
    name: ['auth0'],
    src: SkillIcons.Auth0Icon,
    text: 'Auth0',
  },
  {
    name: ['azure'],
    src: SkillIcons.AzureIcon,
    text: 'Azure',
  },
  {
    name: ['cassandra'],
    src: SkillIcons.CassandraIcon,
    text: 'Cassandra',
  },
  {
    name: ['cloudwego', 'cwgo'],
    src: SkillIcons.CloudWeGoIcon,
    text: 'CloudWeGo',
  },
  {
    name: ['cmake'],
    src: SkillIcons.CMakeIcon,
    text: 'CMake',
  },
  {
    name: ['consul'],
    src: SkillIcons.ConsulIcon,
    text: 'Consul',
  },
  {
    name: ['cpp', 'c++'],
    src: SkillIcons.CPPIcon,
    text: 'C++',
  },
  {
    name: ['csharp', 'c#'],
    src: SkillIcons.CSharpIcon,
    text: 'C#',
  },
  {
    name: ['css', 'css3'],
    src: SkillIcons.CSSIcon,
    text: 'CSS',
  },
  {
    name: ['docker'],
    src: SkillIcons.DockerIcon,
    text: 'Docker',
  },
  {
    name: ['dotnet', '.net'],
    src: SkillIcons.DotNETIcon,
    text: '.NET',
  },
  {
    name: ['django'],
    src: SkillIcons.DjangoIcon,
    text: 'Django',
  },
  {
    name: ['express', 'expressjs'],
    src: SkillIcons.ExpressIcon,
    text: 'ExpressJS',
  },
  {
    name: ['ffmpeg'],
    src: SkillIcons.FFmpegIcon,
    text: 'FFmpeg',
  },
  {
    name: ['firebase'],
    src: SkillIcons.FirebaseIcon,
    text: 'Firebase',
  },
  {
    name: ['gin'],
    src: SkillIcons.GinIcon,
    text: 'Gin',
  },
  {
    name: ['go', 'golang'],
    src: SkillIcons.GoIcon,
    text: 'Go',
  },
  {
    name: ['goravel'],
    src: SkillIcons.GoravelIcon,
    text: 'Goravel',
  },
  {
    name: ['grpc'],
    src: SkillIcons.gRPCIcon,
    text: 'gRPC',
  },
  {
    name: ['html', 'html5'],
    src: SkillIcons.HTMLIcon,
    text: 'HTML',
  },
  {
    name: ['js', 'javascript'],
    src: SkillIcons.JavascriptIcon,
    text: 'JavaScript',
  },
  {
    name: ['jquery'],
    src: SkillIcons.jQueryIcon,
    text: 'jQuery',
  },
  {
    name: ['jwt', 'jsonwebtoken'],
    src: SkillIcons.JWTIcon,
    text: 'JSON Web Token',
  },
  {
    name: ['unix', 'linux'],
    src: SkillIcons.LinuxIcon,
    text: 'Linux',
  },
  {
    name: ['mongo', 'mongodb'],
    src: SkillIcons.MongoDBIcon,
    text: 'MongoDB',
  },
  {
    name: ['mysql'],
    src: SkillIcons.MySQLIcon,
    text: 'MySQL',
  },
  {
    name: ['mqtt'],
    src: SkillIcons.MQTTIcon,
    text: 'MQTT',
  },
  {
    name: ['nestjs'],
    src: SkillIcons.NestJSIcon,
    text: 'NestJS',
  },
  {
    name: ['nextjs', 'next.js'],
    src: SkillIcons.NextJSIcon,
    text: 'Next.js',
  },
  {
    name: ['node', 'nodejs'],
    src: SkillIcons.NodeJSIcon,
    text: 'NodeJS',
  },
  {
    name: ['openapi'],
    src: SkillIcons.OpenAIIcon,
    text: 'OpenAPI',
  },
  {
    name: ['opencv'],
    src: SkillIcons.OpenCVIcon,
    text: 'OpenCV',
  },
  {
    name: ['php'],
    src: SkillIcons.PHPIcon,
    text: 'PHP',
  },
  {
    name: ['postgres', 'postgresql'],
    src: SkillIcons.PostgreSQLIcon,
    text: 'PostgreSQL',
  },
  {
    name: ['python'],
    src: SkillIcons.PythonIcon,
    text: 'Python',
  },
  {
    name: ['rabbitmq'],
    src: SkillIcons.RabbitMQIcon,
    text: 'RabbitMQ',
  },
  {
    name: ['reactjs', 'react.js'],
    src: SkillIcons.ReactIcon,
    text: 'ReactJS',
  },
  {
    name: ['redis'],
    src: SkillIcons.RedisIcon,
    text: 'Redis',
  },
  {
    name: ['socketio', 'socket.io'],
    src: SkillIcons.SocketIOIcon,
    text: 'Socket.IO',
  },
  {
    name: ['sqlserver', 'sql server', 'mssql', 'ms sql'],
    src: SkillIcons.SQLServerIcon,
    text: 'SQL Server',
  },
  {
    name: ['svelte'],
    src: SkillIcons.SvelteIcon,
    text: 'Svelte',
  },
  {
    name: ['sveltekit'],
    src: SkillIcons.SvelteKitIcon,
    text: 'SvelteKit',
  },
  {
    name: ['tailwind', 'tailwindcss'],
    src: SkillIcons.TailwindCSSIcon,
    text: 'TailwindCSS',
  },
  {
    name: ['twilio'],
    src: SkillIcons.TwilioIcon,
    text: 'Twilio',
  },
  {
    name: ['typesense'],
    src: SkillIcons.TypesenseIcon,
    text: 'Typesense',
  },
  {
    name: ['unity'],
    src: SkillIcons.UnityIcon,
    text: 'Unity',
  },
  {
    name: ['vercel'],
    src: SkillIcons.VercelIcon,
    text: 'Vercel',
  },
  {
    name: ['webrtc'],
    src: SkillIcons.WebRTCIcon,
    text: 'WebRTC',
  },
];

const SkillIcon = ({ name }: SkillIconProps) => {
  let skill = skills.find((skill) => skill.name.includes(name.toLowerCase()));

  if (!skill) skill = { name: [name], src: SkillIcons.GenericIcon, text: name };

  return (
    <div className="generic-skill-img-wrapper" data-text={skill.text}>
      <img className="generic-skill-img" src={skill.src} alt=""></img>
    </div>
  );
};

export default SkillIcon;
