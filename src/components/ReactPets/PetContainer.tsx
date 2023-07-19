import { useRef } from 'react';
import '../../assets/styles/ReactPets.css';
import Pet from './Pet';
import { PetType } from './BasePet';

interface PetContainerProps {
  overlay: boolean;
}

const PetContainer = ({ overlay }: PetContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={overlay ? 'pet-container-overlay' : 'pet-container'}
    >
      <Pet
        containerRef={containerRef}
        petType={PetType.Bunny}
        movementIntervalMs={5}
        stateUpdateIntervalMs={4000}
      />
      <Pet
        containerRef={containerRef}
        petType={PetType.Bunny}
        movementIntervalMs={5}
        stateUpdateIntervalMs={6000}
      />
      <Pet
        containerRef={containerRef}
        petType={PetType.Cat}
        movementIntervalMs={5}
        stateUpdateIntervalMs={5000}
      />
    </div>
  );
};

export default PetContainer;
