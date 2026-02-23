import { useState, useEffect, memo, MutableRefObject } from 'react';
import { TrackEventParams } from '@jonkoops/matomo-tracker-react/lib/types';
import aboutIcon from '../assets/images/icons/about-icon.svg';
import educationIcon from '../assets/images/icons/education-icon.svg';
import experienceIcon from '../assets/images/icons/experience-icon.svg';
import projectIcon from '../assets/images/icons/project-icon.svg';
import '../assets/styles/Header.css';

interface HeaderProps {
  headerRefs: { ref: MutableRefObject<HTMLDivElement>; name: string }[];
  trackEvent: (param: TrackEventParams) => void;
}

const iconMap: Record<string, string> = {
  about: aboutIcon,
  education: educationIcon,
  experience: experienceIcon,
  projects: projectIcon,
};

const Header = ({ headerRefs, trackEvent }: HeaderProps) => {
  const [activeCategory, setActiveCategory] = useState(headerRefs[0].name);

  useEffect(() => {
    const checkActiveCategory = () => {
      // get sections that are visible
      const shownSections = headerRefs
        .map(({ ref }) => {
          const rect = ref.current.getBoundingClientRect();
          const heightShown =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          return {
            id: ref.current.id,
            height: heightShown,
          };
        })
        .filter((section) => section.height > 0);

      // get section which is shown the most
      if (shownSections.length > 0) {
        const maxSection = shownSections.reduce((acc, cur) => {
          return cur.height > acc.height ? cur : acc;
        }, shownSections[0]);

        setActiveCategory(maxSection.id);
      }
    };

    window.addEventListener('scroll', checkActiveCategory);
    return () => {
      window.removeEventListener('scroll', checkActiveCategory);
    };
  });

  const scrollTo = (ref: MutableRefObject<HTMLDivElement>) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });

    trackEvent({
      category: 'header',
      action: 'scroll-to',
      name: ref.current.id,
    });
  };

  const headerElements = headerRefs.map((hRef, i) => {
    return (
      <span
        key={`${i}-header`}
        className={(activeCategory === hRef.name ? 'active' : '') + ' nav-link'}
        onClick={() => scrollTo(hRef.ref)}
      >
        {hRef.name}
      </span>
    );
  });

  const headerElementsMobile = headerRefs.map(({ ref, name }, i) => {
    return (
      <span
        key={`${i}-header-mobile`}
        className={(activeCategory === name ? 'active' : '') + ' nav-link'}
        onClick={() => scrollTo(ref)}
      >
        <img src={iconMap[name]} alt={`${name} Icon`} />
      </span>
    );
  });

  return (
    <>
      <nav className="nav-header">{headerElements}</nav>
      <nav className="nav-header-mobile">{headerElementsMobile}</nav>
    </>
  );
};

export default memo(Header);
