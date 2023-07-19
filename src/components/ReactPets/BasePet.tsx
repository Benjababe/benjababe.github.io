export enum PetType {
  Bunny = 'Bunny',
}

export enum PetState {
  Idle = 'Idle',
  MovingL = 'MovingL',
  MovingR = 'MovingR',
  Sleeping = 'Sleeping',
  Dragging = 'Dragging',
  Falling = 'Falling',
}

class BasePet {
  state: PetState;
  availableStates: PetState[];

  spriteHeight: number;
  spriteWidth: number;

  gravity: number;
  moveSpeed: number;

  idleAnim: string;
  movingLAnim: string;
  movingRAnim: string;
  fallingAsleepAnim: string;
  sleepingAnim: string;

  getRandomState() {
    return this.availableStates[
      Math.floor(Math.random() * this.availableStates.length)
    ];
  }
}

export default BasePet;
