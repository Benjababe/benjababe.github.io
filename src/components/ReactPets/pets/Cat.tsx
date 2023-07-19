import BasePet, { PetState } from '../BasePet';
import idleAnim from '../../../assets/media/pets/cat/idle.gif';
import movingLAnim from '../../../assets/media/pets/cat/moving-left.gif';
import movingRAnim from '../../../assets/media/pets/cat/moving-right.gif';
import sleepingAnim from '../../../assets/media/pets/cat/sleeping.gif';

class Cat extends BasePet {
  constructor() {
    super();

    this.state = PetState.Idle;
    this.availableStates = [
      PetState.Idle,
      PetState.MovingL,
      PetState.MovingR,
      PetState.Sleeping,
    ];

    this.spriteHeight = 64;
    this.spriteWidth = 64;

    this.moveSpeed = 1;
    this.gravity = 2;

    this.idleAnim = idleAnim;
    this.movingLAnim = movingLAnim;
    this.movingRAnim = movingRAnim;
    this.sleepingAnim = sleepingAnim;
  }
}

export default Cat;
