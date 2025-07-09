import {Location} from '@angular/common';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {OverlayRef} from '@angular/cdk/overlay';
import {merge, Observable, Subject} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {MatSlidePanelContainer} from './mat-slide-panel-container';


export class MatSlidePanelRef<T = any, R = any> {
  instance: T;

  containerInstance: MatSlidePanelContainer;

  disableClose: boolean | undefined;

  private readonly _afterDismissed = new Subject<R | undefined>();

  private readonly _afterOpened = new Subject<void>();

  private _result: R | undefined;

  private _closeFallbackTimeout: number | any;

  constructor(
    containerInstance: MatSlidePanelContainer,
    private _overlayRef: OverlayRef,
    _location?: Location) {
    this.containerInstance = containerInstance;
    this.disableClose = containerInstance.matSlidePanelConfig.disableClose;

    containerInstance._animationStateChanged.pipe(
      filter(event => event.phaseName === 'done' && event.toState === 'visible'),
      take(1)
    )
    .subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });

    containerInstance._animationStateChanged
        .pipe(filter(event => event.phaseName === 'done' && event.toState === 'hidden'), take(1))
        .subscribe(() => {
          clearTimeout(this._closeFallbackTimeout);
          _overlayRef.dispose();
        });

    _overlayRef.detachments().pipe(take(1)).subscribe(() => {
      this._afterDismissed.next(this._result);
      this._afterDismissed.complete();
    });

    merge(
      _overlayRef.backdropClick(),
      _overlayRef.keydownEvents().pipe(filter(event => event.key === 'Escape'))
    ).subscribe(event => {
      if (!this.disableClose &&
        (event.type !== 'keydown' || !hasModifierKey(event as KeyboardEvent))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }

  dismiss(result?: R): void {
    if (!this._afterDismissed.closed) {
      this.containerInstance._animationStateChanged.pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      ).subscribe(event => {
        this._closeFallbackTimeout = setTimeout(() => {
          this._overlayRef.dispose();
        }, event.totalTime + 100);

        this._overlayRef.detachBackdrop();
      });

      this._result = result;
      this.containerInstance.exit();
    }
  }

  afterDismissed(): Observable<R | undefined> {
    return this._afterDismissed.asObservable();
  }

  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }
}
