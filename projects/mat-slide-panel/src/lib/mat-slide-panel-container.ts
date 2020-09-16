import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  ViewChild,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  Inject,
  Optional, HostBinding,
} from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import {
  BasePortalOutlet,
  ComponentPortal,
  TemplatePortal,
  CdkPortalOutlet,
  DomPortal,
} from '@angular/cdk/portal';
import {matSlidePanelAnimations} from './mat-slide-panel-animations';
import {DOCUMENT} from '@angular/common';
import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { MatSlidePanelConfig } from './mat-slide-panel-config';
import { AnimationCurves, AnimationDurations } from '@angular/material/core';

@Component({
  selector: 'mat-slide-panel-container',
  templateUrl: 'mat-slide-panel-container.html',
  styleUrls: ['mat-slide-panel-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [ matSlidePanelAnimations('right'), matSlidePanelAnimations('left')],
  host: {
    'class': 'mat-slide-panel-container',
    'tabindex': '-1',
    'role': 'dialog',
    'aria-modal': 'true',
    '[attr.aria-label]': 'matSlidePanelConfig?.ariaLabel',
    '[@right]': '{value: _animationState, params: {xValue: xValue}}',
    '(@right.start)': '_onAnimationStart($event)',
    '(@right.done)': '_onAnimationDone($event)',
  },
})
export class MatSlidePanelContainer extends BasePortalOutlet implements OnDestroy {
  /** The portal outlet inside of this container into which the content will be loaded. */
  @ViewChild(CdkPortalOutlet, {static: true}) _portalOutlet: CdkPortalOutlet;

  _animationState: 'void' | 'visible' | 'hidden' | 'right' | 'left' = 'left';

  position = this.matSlidePanelConfig.slideFrom;
  xValue = this.matSlidePanelConfig.slideFrom === 'right' ? '100' : '-100';

  /** Emits whenever the state of the animation changes. */
  _animationStateChanged = new EventEmitter<AnimationEvent>();

  private _focusTrap: FocusTrap;

  private _elementFocusedBeforeOpened: HTMLElement | null = null;

  /** Server-side rendering-compatible reference to the global document object. */
  private _document: Document;

  /** Whether the component has been destroyed. */
  private _destroyed: boolean;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusTrapFactory: ConfigurableFocusTrapFactory,
    @Optional() @Inject(DOCUMENT) document: any,
    public matSlidePanelConfig: MatSlidePanelConfig) {
    super();

    this._document = document;
    this._animationState = this.matSlidePanelConfig.slideFrom;
  }

  /** Attach a component portal as content to this bottom sheet container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._validatePortalAttached();
    this._setPanelClass();
    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this bottom sheet container. */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._validatePortalAttached();
    this._setPanelClass();
    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  attachPortal = <C, T = any, R = any>(portal: ComponentPortal<C> | TemplatePortal<T> | any) => {
    this._validatePortalAttached();
    this._setPanelClass();
    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attach(portal);
  }

  enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
    }
  }

  exit(): void {
    if (!this._destroyed) {
      // this._animationState = this.matSlidePanelConfig.slideFrom;
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy() {
    this._destroyed = true;
  }

  _onAnimationDone(event: AnimationEvent) {
    // if (event.toState === `hidden-${this.matSlidePanelConfig.slideFrom}`) {
    if (event.toState === 'hidden') {
      this._restoreFocus();
    } else if (event.toState === 'visible') {
      this._trapFocus();
    }

    this._animationStateChanged.emit(event);
  }

  _onAnimationStart(event: AnimationEvent) {
    this._animationStateChanged.emit(event);
  }

  private _validatePortalAttached() {
    if (this._portalOutlet.hasAttached()) {
      throw Error('Attempting to attach slide panel content after content is already attached');
    }
  }

  private _setPanelClass() {
    const element: HTMLElement = this._elementRef.nativeElement;
    const panelClass = this.matSlidePanelConfig.panelClass;

    if (Array.isArray(panelClass)) {
      // Note that we can't use a spread here, because IE doesn't support multiple arguments.
      panelClass.forEach(cssClass => element.classList.add(cssClass));
    } else if (panelClass) {
      element.classList.add(panelClass);
    }
  }

  /** Moves the focus inside the focus trap. */
  private _trapFocus() {
    const element = this._elementRef.nativeElement;

    if (!this._focusTrap) {
      this._focusTrap = this._focusTrapFactory.create(element);
    }

    if (this.matSlidePanelConfig.autoFocus) {
      this._focusTrap.focusInitialElementWhenReady();
    } else {
      const activeElement = this._document.activeElement;

      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  private _restoreFocus() {
    const toFocus = this._elementFocusedBeforeOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (this.matSlidePanelConfig.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this._document.activeElement;
      const element = this._elementRef.nativeElement;

      if (!activeElement || activeElement === this._document.body || activeElement === element ||
        element.contains(activeElement)) {
        toFocus.focus();
      }
    }

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }

  private _savePreviouslyFocusedElement() {
    this._elementFocusedBeforeOpened = this._document.activeElement as HTMLElement;

    // The `focus` method isn't available during server-side rendering.
    if (this._elementRef.nativeElement.focus) {
      Promise.resolve().then(() => this._elementRef.nativeElement.focus());
    }
  }
}
