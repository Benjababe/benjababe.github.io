import BasePet, { PetState } from '../BasePet';
import idleAnim from '../../../assets/media/pets/rabbit/idle.gif';
import movingLAnim from '../../../assets/media/pets/rabbit/moving-left.gif';
import movingRAnim from '../../../assets/media/pets/rabbit/moving-right.gif';
import fallingAsleepAnim from '../../../assets/media/pets/rabbit/falling-asleep.gif';
import sleepingAnim from '../../../assets/media/pets/rabbit/sleeping.gif';

class Rabbit extends BasePet {
  constructor() {
    super();

    this.state = PetState.Idle;
    this.availableStates = [
      PetState.Idle,
      PetState.MovingL,
      PetState.MovingR,
      PetState.Sleeping,
    ];

    this.spriteHeight = 74;
    this.spriteWidth = 55;

    this.moveSpeed = 1;
    this.gravity = 2;

    this.idleAnim = idleAnim;
    this.movingLAnim = movingLAnim;
    this.movingRAnim = movingRAnim;
    this.fallingAsleepAnim = fallingAsleepAnim;
    this.sleepingAnim = sleepingAnim;
  }
}

export default Rabbit;
