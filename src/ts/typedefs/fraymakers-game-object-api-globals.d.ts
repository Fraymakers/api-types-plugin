declare interface Common {
  /**
   * Helper method to add healing functionality from absorbbox=>hitbox collisions.
   * @param options Set damageAbsorb to true to heal the amount of damage dealt by the opposing hitbox. Set bonusHeal to a value > 0 to heal an additional amount.
   */
  enableAbsorbListener(options:{damageAbsorb:boolean, bonusHeal:number}):void;

  /**
   * Helper method to disable the absorption functionality granted by enableAbsorbListener().
   */
  disableAbsorbListener():void;
}
 