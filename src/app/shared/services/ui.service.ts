import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ConfirmationDialogComponent } from '../dialogs/confirmation/confirmation-dialog.component';

interface WindowScrollDistance {
  top: number;
  bottom: number;
}

@Injectable()
export class UiService {
  screenMode$ = new BehaviorSubject<'desktop' | 'mobile' | 'tablet'>(null);
  windowScroll$ = new EventEmitter<WindowScrollDistance>(null);

  constructor(
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: Overlay,
    private scrollDispatcher: ScrollDispatcher
  ) {
    this.initScreenMode();
    this.initScrollListener();
  }

  private initScreenMode() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (width <= 800) {
      this.setScreenMode('mobile');
    } else if (width <= 1000) {
      this.setScreenMode('tablet');
    } else {
      this.setScreenMode('desktop');
    }
  }

  private initScrollListener() {
    this.scrollDispatcher.scrolled().subscribe({
      next: () => {
        const top = window.scrollY;
        const bottom =
          document.body.scrollHeight - window.innerHeight - window.scrollY;
        console.log('yoo');
        this.windowScroll$.next({
          top,
          bottom
        });
      }
    });
  }

  public displayToast(message, error = false) {
    this.matSnackBar.open(message, null, {
      duration: 3000,
      panelClass: error ? 'error-snackar' : null
    });
  }

  public displayConfirmationPopup(text?: {
    main?: string;
    yes?: string;
    no?: string;
  }): MatDialogRef<ConfirmationDialogComponent> {
    return this.displayDialog(
      ConfirmationDialogComponent,
      { width: '40vw', height: '25vh' },
      {
        text
      }
    );
  }

  public displayDialog(
    component: any,
    size: { width: string; height: string },
    data?: any,
    fullScreenMobile?: boolean
  ): MatDialogRef<any> {
    const classes = ['confirmation-dialog'];

    if (this.screenMode$.value === 'mobile') {
      classes.push('mobile');

      if (fullScreenMobile) {
        classes.push('mobile-full');
      }
    }

    if (this.screenMode$.value === 'mobile' && fullScreenMobile) {
      size.width = '100vw';
    } else if (this.screenMode$.value === 'mobile') {
      size.width = '90vw';
    }

    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      width: size.width,
      height:
        this.screenMode$.value === 'mobile' && fullScreenMobile
          ? '100vh'
          : size.height,
      maxWidth: '100vw !important',
      panelClass: classes,
      minWidth: this.screenMode$.value !== 'mobile' ? '400px' : '90vw',
      autoFocus: false,
      restoreFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      data
    });

    return dialogRef;
  }

  private setScreenMode(screenMode: 'desktop' | 'mobile' | 'tablet') {
    if (screenMode === this.screenMode$.value) {
      return;
    }

    this.screenMode$.next(screenMode);
  }
}
