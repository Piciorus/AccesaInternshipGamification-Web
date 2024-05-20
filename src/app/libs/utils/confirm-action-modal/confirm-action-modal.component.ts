import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
})
export class ConfirmActionModalComponent {
  message?: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.message = this.data.message;
  }

  closeModal(result: boolean): void {
    this.dialogRef.close(result);
  }
}
