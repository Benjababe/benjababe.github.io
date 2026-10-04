import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { TrackEventParams } from '@jonkoops/matomo-tracker-react/lib/types';
import 'react-image-gallery/styles/css/image-gallery.css';

import kumaPeek from '../assets/images/kuma/kuma-peek.webp';
import kuma1 from '../assets/images/kuma/kuma-pic-1.webp';
import kuma2 from '../assets/images/kuma/kuma-pic-2.webp';
import kuma3 from '../assets/images/kuma/kuma-pic-3.webp';
import kuma4 from '../assets/images/kuma/kuma-pic-4.webp';
import kumaGenlop from '../assets/images/kuma/kuma-genlop.webp';
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
  const images = [
    { original: kuma1, thumbnail: kuma1, originalAlt: 'Kuma Linux terminal' },
    { original: kuma2, thumbnail: kuma2, originalAlt: 'Kuma Linux desktop' },
    {
      original: kuma3,
      thumbnail: kuma3,
      originalAlt: 'Kuma Linux applications',
    },
    {
      original: kuma4,
      thumbnail: kuma4,
      originalAlt: 'Kuma Linux customization',
    },
  ] as ReactImageGalleryItem[];

  return (
    <section
      className={`section kuma-section ${showKuma ? 'shown' : 'hidden'}`}
    >
      <div className="blog-container">
        <ImageGallery
          items={images}
          infinite={true}
          showThumbnails={false}
          showBullets={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={true}
          showIndex={true}
        />
        <h3 className="kuma-caption light-text">
          Who is so much of a moron to spend over a week installing an usable
          operating system?
        </h3>
        <img width="100%" src={kumaGenlop} alt="Kuma Genlop Times" />
      </div>
    </section>
  );
};
