import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';
import {AnimationCurves, AnimationDurations} from '@angular/material/core';

/** Animations used by the Material bottom sheet. */
export const slideFromLeftAnimations: {
  readonly slideFromLeftAnimationsState: AnimationTriggerMetadata;
} = {
  /** Animation that shows and hides a bottom sheet. */
  slideFromLeftAnimationsState: trigger('left', [
    state('void, hidden', style({transform: 'translateX(-100%)'})),
    state('visible', style({transform: 'translateY(0%)'})),
    transition('visible => void, visible => hidden',
      animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.ACCELERATION_CURVE}`)),
    transition('void => visible',
      animate(`${AnimationDurations.EXITING} ${AnimationCurves.DECELERATION_CURVE}`)),
  ])
};


/** Animations used by the Material bottom sheet. */
export const slideFromRightAnimations: {
  readonly slideFromLeftAnimationsState: AnimationTriggerMetadata;
} = {
  /** Animation that shows and hides a bottom sheet. */
  slideFromLeftAnimationsState: trigger('right', [
    state('void, hidden', style({transform: 'translateX(100%)'})),
    state('visible', style({transform: 'translateY(0%)'})),
    transition('visible => void, visible => hidden',
      animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.ACCELERATION_CURVE}`)),
    transition('void => visible',
      animate(`${AnimationDurations.EXITING} ${AnimationCurves.DECELERATION_CURVE}`)),
  ])
};
