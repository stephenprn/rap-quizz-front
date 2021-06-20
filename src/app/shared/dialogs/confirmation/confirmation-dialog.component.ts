import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public texts = {
    main: 'Êtes-vous sûr de vouloir faire cela ?',
    yes: 'Oui',
    no: 'Non'
  };
  public warning: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initValues();
  }

  private initValues() {
    this.texts = {
      ...this.texts,
      ...this.data.texts
    };
    this.warning = this.data.warning;
  }

  public close(state: boolean) {
    this.dialogRef.close(state);
  }
}
