declare interface Common {
  /**
   * Helper method to add healing functionality from reflectbox=>hitbox collisions.
   * @param options The value assigned to "mode" determines the behavior of the projectile when it is reflected. "X"= Flips and reverse momentum horizontally. "Y"= Flips and reverses momentum vertically. "XY"= Flips and reverses momentum both horizontally and vertically. Set replaceOwner to true change the owner of the projectile to the object responsible for reflecting it.
   */
  enableReflectionListener(options:{mode:'X'|'Y'|'XY'|'MOMENTUM'; replaceOwner:boolean}):void;

  /**
   * Helper method to disable the reflection functionality granted by enableReflectionListener().
   */
  disableReflectionListener():void;
}
