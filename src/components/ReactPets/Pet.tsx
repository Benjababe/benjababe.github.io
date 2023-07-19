import { useState, useEffect, useRef, RefObject } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import BasePet, { PetState, PetType } from './BasePet';
import Bunny from './pets/Bunny';

interface PetProps {
  containerRef: RefObject<HTMLDivElement>;
  petType: PetType;
}

interface Position {
  x: number;
  y: number;
}

interface Rect {
  height: number;
  width: number;
}

const getPet = (petType: PetType): BasePet => {
  switch (petType) {
    case PetType.Bunny:
      return new Bunny();
  }
};

const Pet = ({ containerRef, petType }: PetProps) => {
  const petImgRef = useRef<HTMLImageElement>(null);
  const [petState, setPetState] = useState<PetState>(PetState.Idle);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [targetX, setTargetX] = useState<number>(0);
  const [containerRect, setContainerRect] = useState<Rect>();

  const petInfo = getPet(petType);

  const handleStart = () => {
    setPetState(PetState.Dragging);
    petImgRef.current.src = petInfo.idleAnim;
  };
  const handleStop = () => setPetState(PetState.Falling);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const updatePosition = () => {
    setPosition((prevPosition) => {
      if (petState === PetState.Falling) {
        const newY = prevPosition.y + petInfo.gravity;
        const maxY = containerRect.height - petInfo.spriteHeight;
        const adjustedY = Math.min(newY, maxY);

        if (Math.floor(adjustedY) === Math.floor(prevPosition.y)) {
          setPetState(PetState.Idle);
        }

        return { ...prevPosition, y: adjustedY };
      } else if (petState === PetState.MovingL) {
        const newX = prevPosition.x - petInfo.moveSpeed;
        const adjustedX = Math.max(newX, targetX);

        if (Math.floor(adjustedX) === Math.floor(prevPosition.x)) {
          setPetState(PetState.Idle);
        }

        return { ...prevPosition, x: adjustedX };
      } else if (petState === PetState.MovingR) {
        const newX = prevPosition.x + petInfo.moveSpeed;
        const adjustedX = Math.min(newX, targetX);

        if (Math.floor(adjustedX) === Math.floor(prevPosition.x)) {
          setPetState(PetState.Idle);
        }

        return { ...prevPosition, x: adjustedX };
      } else {
        return prevPosition;
      }
    });
  };

  const chooseMove = () => {
    if (petState === PetState.Dragging || petState === PetState.Falling) return;

    // reroll state if it's the same as previous state
    // or if it rolled move left and it's too far left
    // or if it rolled move right and it's too far right
    let newPetState = petInfo.getRandomState();
    while (
      newPetState === petState ||
      (newPetState === PetState.MovingL &&
        position.x <= containerRect.width / 4) ||
      (newPetState === PetState.MovingR &&
        position.x >= (containerRect.width * 3) / 4 - petInfo.spriteWidth)
    ) {
      newPetState = petInfo.getRandomState();
    }
    setPetState(newPetState);
  };

  useEffect(() => {
    switch (petState) {
      case PetState.Idle: {
        petImgRef.current.src = petInfo.idleAnim;
        break;
      }

      case PetState.MovingL: {
        const minX = 0;
        const maxX = (containerRect.width * 3) / 8 - 1;
        const newTargetX = Math.floor(Math.random() * (maxX - minX));
        setTargetX(newTargetX);
        console.log(newTargetX);

        petImgRef.current.src = petInfo.movingLAnim;
        break;
      }

      case PetState.MovingR: {
        const minX = (containerRect.width * 5) / 8 - petInfo.spriteWidth + 1;
        const maxX = containerRect.width - petInfo.spriteWidth;
        const newTargetX = Math.floor(Math.random() * (maxX - minX) + minX);
        setTargetX(newTargetX);
        console.log(newTargetX);

        petImgRef.current.src = petInfo.movingRAnim;
        break;
      }

      case PetState.Sleeping: {
        petImgRef.current.src = petInfo.fallingAsleepAnim;
        setTimeout(() => {
          petImgRef.current.src = petInfo.sleepingAnim;
        }, 2000);
        break;
      }
    }
  }, [petState]);

  useEffect(() => {
    setPetState(PetState.Falling);
    setContainerRect({
      height: containerRef.current.clientHeight,
      width: containerRef.current.clientWidth,
    });
  }, [containerRef.current]);

  useEffect(() => {
    const applyGravityInterval = setInterval(updatePosition, 5);
    return () => clearInterval(applyGravityInterval);
  }, [petState, containerRect, targetX]);

  useEffect(() => {
    const chooseMoveInterval = setInterval(chooseMove, 6000);
    return () => clearInterval(chooseMoveInterval);
  });

  return (
    <Draggable
      position={position}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      nodeRef={petImgRef}
      bounds="parent"
    >
      <img ref={petImgRef} className="pet" src={petInfo.idleAnim} />
    </Draggable>
  );
};

export default Pet;
