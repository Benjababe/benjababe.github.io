export enum PetType {
  Bunny = 'Bunny',
  Cat = 'Cat',
  Dog = 'Dog',
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

  fallingAsleepDelayMs: number;

  /**
   * Loads in animation images beforehand as they may not be ready sometimes
   */
  async preloadAnimations() {
    const images = [
      this.idleAnim,
      this.movingLAnim,
      this.movingRAnim,
      this.fallingAsleepAnim,
      this.sleepingAnim,
    ];

    const promises = images
      .filter((src) => src !== null && src !== undefined)
      .map((src) => {
        return new Promise((res, rej) => {
          const img = new Image();
          img.src = src;
          img.onload = res;
          img.onerror = rej;
        });
      });

    await Promise.all(promises);
  }

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
