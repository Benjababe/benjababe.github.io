import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { TrackEventParams } from '@jonkoops/matomo-tracker-react/lib/types';
import ReactGA from 'react-ga4';
import 'react-image-gallery/styles/css/image-gallery.css';

import kumaPeek from '../assets/images/kuma/kuma-peek.png';
import kuma1 from '../assets/images/kuma/kuma-pic-1.jpg';
import kuma2 from '../assets/images/kuma/kuma-pic-2.jpg';
import kuma3 from '../assets/images/kuma/kuma-pic-3.jpg';
import kuma4 from '../assets/images/kuma/kuma-pic-4.jpg';
import kumaGenlop from '../assets/images/kuma/kuma-genlop.png';
import '../assets/styles/Kuma.css';

interface KumaWidgetProps {
  showKuma: boolean;
  setShowKuma: React.Dispatch<React.SetStateAction<boolean>>;
  trackEvent: (p: TrackEventParams) => void;
}

interface KumaProps {
  showKuma: boolean;
}

export const KumaWidget = ({
  showKuma,
  setShowKuma,
  trackEvent,
}: KumaWidgetProps) => {
  const toggleKuma = () => {
    setShowKuma(!showKuma);

    ReactGA.event({
      category: 'kuma-widget',
      action: 'click-toggle',
      label: showKuma ? 'hide' : 'show',
    });

    trackEvent({
      category: 'kuma-widget',
      action: 'click-toggle',
      name: showKuma ? 'hide' : 'show',
    });
  };

  return (
    <>
      <div>
        <img
          className="kuma-peek"
          onClick={toggleKuma}
          src={kumaPeek}
          alt="Kuma Peek"
        ></img>
      </div>
    </>
  );
};

export const Kuma = ({ showKuma }: KumaProps) => {
  const images: ReactImageGalleryItem[] = [
    { original: kuma1 },
    { original: kuma2 },
    { original: kuma3 },
    { original: kuma4 },
  ];

  return (
    <section
      className={`section kuma-section ${showKuma ? 'shown' : 'hidden'}`}
    >
      <div className="blog-container">
        <ImageGallery
          items={images}
          infinite={true}
          showThumbnails={false}
          showBullets={true}
          showPlayButton={false}
          showFullscreenButton={false}
        />
        <h3 className="kuma-caption light-text">
          Who is so much of a moron to spend over a week installing a usable
          operating system?
        </h3>
        <img width="100%" src={kumaGenlop} alt="Kuma Genlop Times" />
      </div>
    </section>
  );
};
