import BasePet, { PetState } from '../BasePet';
import idleAnim from '../../../assets/media/pets/bunny/idle.gif';
import movingLAnim from '../../../assets/media/pets/bunny/moving-left.gif';
import movingRAnim from '../../../assets/media/pets/bunny/moving-right.gif';
import fallingAsleepAnim from '../../../assets/media/pets/bunny/falling-asleep.gif';
import sleepingAnim from '../../../assets/media/pets/bunny/sleeping.gif';

class Bunny extends BasePet {
  constructor() {
    super();

    this.state = PetState.Idle;
    this.availableStates = [
      PetState.Idle,
      PetState.MovingL,
      PetState.MovingR,
      PetState.Sleeping,
    ];

    // actual height is 74 but reduced because of bottom padding
    this.spriteHeight = 68;
    this.spriteWidth = 55;

    this.moveSpeed = 1;
    this.gravity = 2;

    this.idleAnim = idleAnim;
    this.movingLAnim = movingLAnim;
    this.movingRAnim = movingRAnim;
    this.fallingAsleepAnim = fallingAsleepAnim;
    this.sleepingAnim = sleepingAnim;

    this.fallingAsleepDelayMs = 2000;
  }
}

export default Bunny;
