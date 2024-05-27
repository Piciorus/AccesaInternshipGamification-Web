import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { predictedCategory: string },
    private dialogRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
