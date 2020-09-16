import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';
import {AnimationCurves, AnimationDurations} from '@angular/material/core';

export function matSlidePanelAnimations(side) {
  return trigger(side, [
    state('void, hidden', style({transform: 'translateX({{xValue}}%)'}), { params: { xValue: '100' }}),
    state('visible', style({transform: 'translateX(0%)'})),
    transition('visible => void, visible => hidden',
      animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.ACCELERATION_CURVE}`)),
    transition('* => visible',
      animate(`${AnimationDurations.EXITING} ${AnimationCurves.DECELERATION_CURVE}`)),
  ]);
}
