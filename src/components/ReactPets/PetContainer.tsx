import { cloneElement, ReactElement, ReactNode, useRef } from 'react';
import '../../assets/styles/ReactPets.css';

interface PetContainerProps {
  overlay: boolean;
  children?: ReactNode[];
}

const PetContainer = ({ overlay, children }: PetContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updatedChildren = children.map((child, i) => {
    return cloneElement(child as ReactElement, {
      key: `pet-${i}`,
      containerRef: containerRef,
    });
  });

  return (
    <div
      ref={containerRef}
      className={overlay ? 'pet-container-overlay' : 'pet-container'}
    >
      {updatedChildren}
    </div>
  );
};

export default PetContainer;
