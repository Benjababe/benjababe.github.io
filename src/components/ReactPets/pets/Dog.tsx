import BasePet, { PetState } from '../BasePet';
import idleAnim from '../../../assets/media/pets/dog/idle.gif';
import movingLAnim from '../../../assets/media/pets/dog/moving-left.gif';
import movingRAnim from '../../../assets/media/pets/dog/moving-right.gif';
import fallingAsleepAnim from '../../../assets/media/pets/dog/falling-asleep.gif';
import sleepingAnim from '../../../assets/media/pets/dog/sleeping.gif';

class Dog extends BasePet {
  constructor() {
    super();

    this.state = PetState.Idle;
    this.availableStates = [
      PetState.Idle,
      PetState.MovingL,
      PetState.MovingR,
      PetState.Sleeping,
    ];

    // Actual height is 80 but reduced because of bottom padding
    this.spriteHeight = 64;
    this.spriteWidth = 80;

    this.moveSpeed = 1;
    this.gravity = 2;

    this.idleAnim = idleAnim;
    this.movingLAnim = movingLAnim;
    this.movingRAnim = movingRAnim;
    this.fallingAsleepAnim = fallingAsleepAnim;
    this.sleepingAnim = sleepingAnim;

    this.fallingAsleepDelayMs = 600;
  }
}

export default Dog;
