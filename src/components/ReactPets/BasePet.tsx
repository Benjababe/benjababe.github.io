export enum PetType {
  Bunny = 'Bunny',
  Cat = 'Cat',
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
  /** Current state of the pet */
  state: PetState;
  /** Array of states the pet can enter */
  availableStates: PetState[];

  /** Height of the sprite, used for calculating gravity */
  spriteHeight: number;
  /** Width of the sprite, used for calculating movement positions */
  spriteWidth: number;

  /** Rate at which the pet falls */
  gravity: number;
  /** Rate at which the pet moves */
  moveSpeed: number;

  idleAnim: string;
  movingLAnim: string;
  movingRAnim: string;
  fallingAsleepAnim: string;
  sleepingAnim: string;

  /**
   * Gets a random pet state, may be duplicate from the current state
   * @returns Random pet state
   */
  getRandomState() {
    return this.availableStates[
      Math.floor(Math.random() * this.availableStates.length)
    ];
  }
}

export default BasePet;
