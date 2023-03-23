declare interface Common {
  /**
   * Initiates the universal "fade from white" animation using an HsbcColorFilter. The animation will last 15 frames before reaching the object's natural color scheme.
   */
  startFadeIn():void;
  /**
   * Initiates the universal "fade to white" animation using an HsbcColorFilter. The animation will last 15 frames before reaching absolute white.
   */
  startFadeOut():void;
  /**
   * Checks the current status of the fade in animation. If the animation has completed, it will return true.
   */
  fadeInComplete():boolean;
  /**
   * Checks the current status of the fade out animation. If the animation has completed, it will return true.
   */
  fadeOutComplete():boolean;

  /**
   * Sets up the local state machine for usage.
   */
  initLocalStateMachine():void;

  /**
   * Registers a state value to correspond to a specific animation
   * @param state The integer to represent a local state.
   * @param animation The animation associated with the local state
   */
  registerLocalState(state:number, animation:string):void;

  /**
   * Retrieves the current local state value
   */
  getLocalState():number;

  /**
   * Checks if the current local state is equal to the provided state.
   */
  inLocalState(state):boolean;

  /**
   * Transition the state machine to the provided state value;
   * @param state State to transition to
   */
  toLocalState(state:number):void;

  /**
   * Forcefully sets the local state to the specified value without an animation change.
   * @param state State to assign
   */
  setLocalState(state:number):void;

  /**
   * Repositions self relative to the specified entity with the provided x and y offset.
   * @param entity The Entity to be placed on top of.
   * @param x How many pixels to offset self relative to the entity horizontally.
   * @param y How many pixels to offset self relative to the entity vertically.
   */
  repositionToEntityEcb(entity:Entity, x:number, y:number):void;
}
