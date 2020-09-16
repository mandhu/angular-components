import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy} from '@angular/cdk/overlay';
import {InjectionToken, ViewContainerRef} from '@angular/core';

export const MAT_SLIDE_PANEL_DATA = new InjectionToken<any>('MatSlidePanelData');


export class MatSlidePanelConfig<D = any> {
  /** The view container to place the overlay for the mat slide panel into. */
  viewContainerRef?: ViewContainerRef;

  /** Extra CSS classes to be added to the mat slide panel container. */
  panelClass?: string | string[];

  /** Text layout direction for the mat slide panel. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** Whether the mat slide panel has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Custom class for the backdrop. */
  backdropClass?: string;

  /** Whether the user can use escape or clicking outside to close the mat slide panel. */
  disableClose?: boolean = false;

  /** Aria label to assign to the mat slide panel element. */
  ariaLabel?: string | null = null;

  /**
   * Whether the mat slide panel should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean = true;

  // Note that this is disabled by default, because while the a11y recommendations are to focus
  // the first focusable element, doing so prevents screen readers from reading out the
  // rest of the mat slide panel content.
  /** Whether the mat slide panel should focus the first focusable element on open. */
  autoFocus?: boolean = false;

  /**
   * Whether the mat slide panel should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean = true;

  /** Scroll strategy to be used for the mat slide panel. */
  scrollStrategy?: ScrollStrategy;


  /** Slide from which side of viewport. */
  slideFrom?: 'left' | 'right' = 'right';
}
