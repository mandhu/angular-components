import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, ComponentType, TemplatePortal} from '@angular/cdk/portal';
import {ComponentRef, Inject, Injectable, InjectionToken, Injector, OnDestroy, Optional, SkipSelf, TemplateRef} from '@angular/core';
import {Location} from '@angular/common';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanelConfig} from './mat-slide-panel-config';
import {MatSlidePanelContainer} from './mat-slide-panel-container';
import {MatSlidePanelModule} from './mat-slide-panel.module';
import {MatSlidePanelRef} from './mat-slide-panel-ref';


export const MAT_SLIDE_PANEL_DEFAULT_OPTIONS =
  new InjectionToken<MatSlidePanelConfig>('mat-Slide-panel-default-options');


@Injectable({providedIn: MatSlidePanelModule})
export class MatSlidePanel implements OnDestroy {
  private _matSlidePanelAtThisLevel: MatSlidePanelRef<any> | null = null;

  /** Reference to the currently opened mat slide panel. */
  get _openedMatSlidePanelRef(): MatSlidePanelRef<any> | null {
    const parent = this._parentMatSlidePanel;
    return parent ? parent._openedMatSlidePanelRef : this._matSlidePanelAtThisLevel;
  }

  set _openedMatSlidePanelRef(value: MatSlidePanelRef<any> | null) {
    if (this._parentMatSlidePanel) {
      this._parentMatSlidePanel._openedMatSlidePanelRef = value;
    } else {
      this._matSlidePanelAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @SkipSelf() private _parentMatSlidePanel: MatSlidePanel,
    @Optional() private _location?: Location,
    @Optional() @Inject(MAT_SLIDE_PANEL_DEFAULT_OPTIONS)
    private _defaultOptions?: MatSlidePanelConfig) {}

  open<T, D = any, R = any>(component: ComponentType<T>,
                            config?: MatSlidePanelConfig<D>): MatSlidePanelRef<T, R>;
  open<T, D = any, R = any>(template: TemplateRef<T>,
                            config?: MatSlidePanelConfig<D>): MatSlidePanelRef<T, R>;

  open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                            config?: MatSlidePanelConfig<D>): MatSlidePanelRef<T, R> {

    const _config =
      _applyConfigDefaults(this._defaultOptions || new MatSlidePanelConfig(), config);
    const overlayRef = this._createOverlay(_config);
    const container = this._attachContainer(overlayRef, _config);
    const ref = new MatSlidePanelRef<T, R>(container, overlayRef, this._location);

    if (componentOrTemplateRef instanceof TemplateRef) {
      container.attachTemplatePortal(new TemplatePortal<T>(componentOrTemplateRef, null!, {
        $implicit: _config.data,
        bottomSheetRef: ref
      } as any));
    } else {
      const portal = new ComponentPortal(componentOrTemplateRef, undefined,
        this._createInjector(_config, ref));
      const contentRef = container.attachComponentPortal(portal);
      ref.instance = contentRef.instance;
    }

    // When the mat slide panel is dismissed, clear the reference to it.
    ref.afterDismissed().subscribe(() => {
      // Clear the mat slide panel ref if it hasn't already been replaced by a newer one.
      if (this._openedMatSlidePanelRef == ref) {
        this._openedMatSlidePanelRef = null;
      }
    });

    if (this._openedMatSlidePanelRef) {
      // If a mat slide panel is already in view, dismiss it and enter the
      // new mat slide panel after exit animation is complete.
      this._openedMatSlidePanelRef.afterDismissed().subscribe(() => ref.containerInstance.enter());
      this._openedMatSlidePanelRef.dismiss();
    } else {
      // If no mat slide panel is in view, enter the new mat slide panel.
      ref.containerInstance.enter();
    }

    this._openedMatSlidePanelRef = ref;

    return ref;
  }

  /**
   * Dismisses the currently-visible mat slide panel.
   */
  dismiss(): void {
    if (this._openedMatSlidePanelRef) {
      this._openedMatSlidePanelRef.dismiss();
    }
  }

  ngOnDestroy() {
    if (this._matSlidePanelAtThisLevel) {
      this._matSlidePanelAtThisLevel.dismiss();
    }
  }

  /**
   * Attaches the mat slide panel container component to the overlay.
   */
  private _attachContainer(overlayRef: OverlayRef,
                           config: MatSlidePanelConfig): MatSlidePanelContainer {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [
        { provide: MatSlidePanelConfig, useValue: config }
      ]
    });

    const containerPortal =
      new ComponentPortal(MatSlidePanelContainer, config.viewContainerRef, injector);
    const containerRef: ComponentRef<MatSlidePanelContainer> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified mat slide panel config.
   */
  private _createOverlay(config: MatSlidePanelConfig): OverlayRef {
    const overlayConfig = new OverlayConfig({
      direction: config.direction,
      hasBackdrop: config.hasBackdrop,
      disposeOnNavigation: config.closeOnNavigation,
      maxWidth: '100%',
      scrollStrategy: config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: config.slideFrom === 'right' ?
        this._overlay.position().global().centerHorizontally().right('0')
        : this._overlay.position().global().centerHorizontally().left('0')
    });

    if (config.backdropClass) {
      overlayConfig.backdropClass = config.backdropClass;
    }

    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an injector to be used inside of a mat slide panel component.
   * @param config Config that was used to create the mat slide panel.
   * @param bottomSheetRef Reference to the mat slide panel.
   */
  private _createInjector<T>(config: MatSlidePanelConfig,
                             bottomSheetRef: MatSlidePanelRef<T>): Injector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const providers = [
      { provide: MatSlidePanelRef, useValue: bottomSheetRef },
      { provide: MAT_SLIDE_PANEL_DATA, useValue: config.data }
    ];

    // If a direction is set in the config, add it to the overlay config
    if (config.direction) {
      // No need to provide Directionality directly, as it's already handled by the overlay
    }

    return Injector.create({
      parent: userInjector || this._injector,
      providers
    });
  }
}

/**
 * Applies default options to the mat slide panel config.
 * @param defaults Object containing the default values to which to fall back.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(defaults: MatSlidePanelConfig,
                              config?: MatSlidePanelConfig): MatSlidePanelConfig {
  return {...defaults, ...config};
}
