import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomErrorResponse } from '../models/custom-error-response';
import { ErrorMessageMapping } from '../models/error-mssage-mapping';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private toaster: ToastrService) {}

  public handleError(err: CustomErrorResponse) {
    if (err.errorCode !== undefined) {
      this.toaster.error(ErrorMessageMapping[err.errorCode], 'Error', {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    }
  }

  public handleSuccess(suc: string) {
    if (suc) this.toaster.success(suc);
  }

  public handleInformative(info: string) {
    if (info) this.toaster.info(info);
  }
}
