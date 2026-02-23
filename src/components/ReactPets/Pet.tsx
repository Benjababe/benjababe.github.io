import { useState, useEffect, useRef, memo, RefObject, ReactElement } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import BasePet, { PetState, PetType } from './BasePet';
import Bunny from './pets/Bunny';
import Cat from './pets/Cat';
import Dog from './pets/Dog';

interface PetProps {
  /** React.Ref of the container of the pet */
  containerRef?: RefObject<HTMLDivElement>;

  /** Predefined pet type */
  petType: PetType;

  /** Number of milliseconds between updating movement of the pet */
  movementIntervalMs: number;

  /** Number of milliseconds between changing the state of the pet */
  stateUpdateIntervalMs: number;
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
    case PetType.Cat:
      return new Cat();
    case PetType.Dog:
      return new Dog();
  }
};

const Pet = ({
  containerRef,
  petType,
  movementIntervalMs: movementInterval,
  stateUpdateIntervalMs: stateUpdateInterval,
}: PetProps): ReactElement => {
  const petImgRef = useRef<HTMLImageElement>(null);
  const [petState, setPetState] = useState<PetState>(PetState.Idle);
  const [position, setPosition] = useState<Position>({ x: 0, y: 100 });
  const [targetX, setTargetX] = useState<number>(0);
  const [containerRect, setContainerRect] = useState<Rect>();

  const petInfo = getPet(petType);

  const handleDragStart = () => {
    setPetState(PetState.Dragging);
    petImgRef.current.src = petInfo.idleAnim;
  };
  const handleDragStop = () => setPetState(PetState.Falling);

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
    // Do not choose a move if pet is being dragged or falling after being dragged
    if (petState === PetState.Dragging || petState === PetState.Falling) return;

    // Reroll state if it rolled move left and it's too far left
    // or if it rolled move right and it's too far right
    let newPetState = petInfo.getRandomState();
    while (
      (newPetState === PetState.MovingL &&
        position.x <= containerRect.width / 6) ||
      (newPetState === PetState.MovingR &&
        position.x >= (containerRect.width * 5) / 6 - petInfo.spriteWidth)
    ) {
      newPetState = petInfo.getRandomState();
    }
    setPetState(newPetState);
  };

  // Handler for pet state change
  useEffect(() => {
    switch (petState) {
      // Idle, just change the animation
      case PetState.Idle: {
        petImgRef.current.src = petInfo.idleAnim;
        break;
      }

      // Moving left, find a x coordinate 3/8 towards the left side
      case PetState.MovingL: {
        const minX = 0;
        const maxX = (containerRect.width * 3) / 8 - 1;
        const newTargetX = Math.floor(Math.random() * (maxX - minX));
        setTargetX(newTargetX);

        petImgRef.current.src = petInfo.movingLAnim;
        break;
      }

      // Moving right, find a x coordinate 3/8 torwards the right side
      case PetState.MovingR: {
        const minX = (containerRect.width * 3) / 8 - petInfo.spriteWidth + 1;
        const maxX = containerRect.width - petInfo.spriteWidth;
        const newTargetX = Math.floor(Math.random() * (maxX - minX) + minX);
        setTargetX(newTargetX);

        petImgRef.current.src = petInfo.movingRAnim;
        break;
      }

      // Sleeping, play falling asleep in-between animation if possible
      case PetState.Sleeping: {
        if (petInfo.fallingAsleepAnim !== undefined) {
          petImgRef.current.src = petInfo.fallingAsleepAnim;
          setTimeout(() => {
            petImgRef.current.src = petInfo.sleepingAnim;
          }, petInfo.fallingAsleepDelayMs);
        } else {
          petImgRef.current.src = petInfo.sleepingAnim;
        }
        break;
      }
    }
  }, [petState]);

  // On container change, reinitialise pet
  useEffect(() => {
    petInfo.preloadAnimations();
    setPetState(PetState.Falling);
    setContainerRect({
      height: containerRef.current.clientHeight,
      width: containerRef.current.clientWidth,
    });
    const minX = 0;
    const maxX = containerRef.current.clientWidth - petInfo.spriteWidth - 1;
    const initX = Math.floor(Math.random() * (maxX - minX));
    setPosition({ ...position, x: initX });
    setTargetX(initX);
  }, [containerRef.current]);

  // On container or pet change, update movement loop
  // as well as stopping the previous movement loop
  useEffect(() => {
    const updatePosInterval = setInterval(updatePosition, movementInterval);
    return () => clearInterval(updatePosInterval);
  }, [petState, containerRect, targetX]);

  // On startup, continuously loop a move choice
  useEffect(() => {
    const chooseMoveInterval = setInterval(chooseMove, stateUpdateInterval);
    return () => clearInterval(chooseMoveInterval);
  });

  return (
    <Draggable
      position={position}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      nodeRef={petImgRef}
      bounds="parent"
    >
      <img ref={petImgRef} className="pet" src={petInfo.idleAnim} />
    </Draggable>
  );
};

export default memo(Pet);
