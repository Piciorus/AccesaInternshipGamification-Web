// import { Injectable } from '@angular/core';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Ensure correct import path
// import { Observable } from 'rxjs';
// import { ConfirmActionModalComponent } from '../utils/confirm-action-modal/confirm-action-modal.component';

// @Injectable({
//   providedIn: 'root',
// })
// export class HandleErrorService {
//   constructor(private dialog: MatDialog) {}

//   openModal(message?: string): Observable<boolean | undefined> {
//     const dialogRef: MatDialogRef<ConfirmActionModalComponent, boolean> =
//       this.dialog.open(ConfirmActionModalComponent, {
//         width: '30rem',
//         disableClose: true,
//         autoFocus: false,
//         data: { message: message },
//       });

//     return dialogRef.afterClosed();
//   }
// }
