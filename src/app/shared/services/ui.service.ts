import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class UiService {
  screenMode$ = new BehaviorSubject<'desktop' | 'mobile' | 'tablet'>(null);

  constructor(
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: Overlay
  ) {
    this.initScreenMode();
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

  public displayToast(message, error = false) {
    this.matSnackBar.open(message, null, {
      duration: 3000,
      panelClass: error ? 'error-snackar' : null,
    });
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
      data,
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
