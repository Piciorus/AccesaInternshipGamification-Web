import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  public userForm: FormGroup;
  public roles = [
    { value: 'ROLE_USER', viewValue: 'ROLE_USER' },
    { value: 'ROLE_ADMIN', viewValue: 'ROLE_ADMIN' },
  ];
  @Output() userUpdated = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {
    this.userForm = this.initForm();
    this.setUserFormValues();
  }

  private setUserFormValues(): void {
    if (this.data.isOnEdit) {
      const user = this.data?.user;
      const selectedRole = this.roles?.find(
        (role) => role.value === user.roles[0].name
      );
      this.userForm.patchValue({
        username: user.username,
        tokens: user.tokens,
        threshold: user.threshold,
        role: selectedRole ? selectedRole.value : null,
      });
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      tokens: ['', Validators.required],
      threshold: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  public updateUser() {
    const userToUpdate: any = {
      username: this.userForm.get('username')?.value,
      tokens: this.userForm.get('tokens')?.value,
      threshold: this.userForm.get('threshold')?.value,
      role: this.userForm.get('role')?.value,
    };

    const observer = {
      next: (response: { status: number }) => {
        if (this.data?.isOnEdit) {
          this.userUpdated.emit();
          this.toastr.success('User updated successfully');
        }
      },
      error: (error: any) => {
        if (error.status === 500) {
          this.toastr.error('User not updated');
        } else {
          this.toastr.error('An error occurred while processing your request');
        }
      },
    };
    if (this.data?.isOnEdit) {
      this.userService
        .updateUser(this.data.user.id, userToUpdate)
        .pipe(take(1))
        .subscribe(observer);
    }
  }
}
