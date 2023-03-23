declare interface Common {
  /**
   * Attempts to enable IASA (interrupt-as-soon-as) for the current animation, taking the object state into account.
   * Unlike modifying the interruptible animation stat directly, it does not allow IASA to be enabled during an airdash cancel that has not hit anything yet.  
   * Can always disable IASA.
   * @param iasaFlag True to enable IASA, false to disable;
   */
  setIASA(iasaFlag:boolean):void;

  /**
   * Helper function to generate dash dust effects.
   */
  generateDashDust():void;

  /**
   * Helper function to generate air dash effects.
   * @param angle The angle of the air dash.
   * @returns The generate Vfx instance.
   */
  generateAirdashVfx(angle:number):Vfx;

  /**
   * Adjust the hurt medium angle threshold for transitioning to tumble.
   * @param value The angle to use as the threshold.
   */
  setHurtMediumAngle(value:number):void;

  /**
   * Initiates the jumping part of a ledge jump
   */
  performLedgeJump(character:Character):void;

  /**
   * Applies ledge jump speed immediately using character's ledge jump stats
   */
  applyLedgeJumpSpeed(character):void;

  /**
   * Performs the action exactly once, as soon as the condition fails.
   * @param action A void function that is executed when the timer fires.
   * @param condition A boolean function that is checked every frame.
   */
  performActionWhenFalse(action:() => void, condition:() => boolean):void;

  /**
   * Intended to be used only on hurt animations.
   * The frame that this runs on will be held for a length of time dependent on the remaining frames in the animation and the length of hitstun.
   * 
   * For example, suppose you have 12 frames of hitstun remaining and you have 5 frames remaining in your animation. It will hold on this frame for the difference, 7 frames, before resuming and completing the animation at the same time that hitstun ends.
   */
  lingerOnFrameDuringHitstun():void;

  /**
   * Call in the timeline.  From this frame on in the current animation, if player is not holding DOWN the character will automatically jump to the crouch_out animation.
   * Intended to be used during crouch_in only.
   */
  allowJumpToCrouchOut():void;

  /**
   * Call in the timeline.  From this frame on in the current animation, if player is not holding DOWN the character will automatically jump to the crouch_out animation.
   * Intended to be used during crouch_out only.
   */
  allowJumpToCrouchIn():void;

  /** Play a random Shield Hit Sound */
  playRandomShieldHitSound():void;

  /**
   * Attempts to enable/disable autocancel for the current animation, taking the object state into account.
   * Does not allow autocancel to be set if the object is doing an airdash cancel that has not hit anything yet.
   * Can always disable autocancel.
   * @param autocancelFlag Pass as true to enable autocancel, false to disable.
   */
  setAutocancel(autocancelFlag:boolean):void;


  /**
   * Helper method for triggering a callback when a combination of buttons are pressed at the same time. Supports checking multiple buttons using bitwise operations.
   * @param buttons The button(s) to listen for (See Buttons class).
   * @param callback The method to execute when the buttons are pressed at the same time.
   * @returns Reference to the timer uid so the timer may be removed via self.removeTimer().
   */
  onButtonsPressed(buttons:number, callback:() => void):void;

  /**
   * Helper method for triggering a callback when a combination of buttons are held at the same time. Supports checking multiple buttons using bitwise operations.
   * @param buttons The button(s) to listen for (See Buttons class).
   * @param callback The method to execute when the buttons are held at the same time.
   * @returns Reference to the timer uid so the timer may be removed via self.removeTimer().
   */
  onButtonsHeld(buttons:number, callback:() => void):void;

  /**
   * Helper method for triggering a callback when a combination of buttons are released. Supports checking multiple buttons using bitwise operations.
   * @param buttons The button(s) to listen for (See Buttons class).
   * @param callback The method to execute when the buttons are released.
   * @returns Reference to the timer uid so the timer may be removed via self.removeTimer().
   */
  onButtonsReleased(buttons:number, callback:() => void):void;

  /**
   * Helper method for triggering a callback when a combination of buttons are not held. Supports checking multiple buttons using bitwise operations.
   * @param buttons The button(s) to listen for (See Buttons class).
   * @param callback The method to execute when the buttons are no longer held.
   * @returns Reference to the timer uid so the timer may be removed via self.removeTimer().
   */
  onButtonsNotHeld(buttons:number, callback:() => void):void;
}