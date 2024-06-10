import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { User } from 'src/app/libs/models/user';
import { ConfirmActionModalService } from 'src/app/libs/services/confirmation-action-modal.sevice';
import { UserService } from 'src/app/libs/services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'tokens',
    'threshold',
    'roles',
    'badges',
    'actions',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  loggedInUsername: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private confirmActionModalService: ConfirmActionModalService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filterUsers(users: any[]): any[] {
    return users.filter(
      (user) =>
        !user.roles.some((role: { name: string }) => role.name === 'ROLE_ADMIN')
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAllUser(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      const filteredUsers = this.filterUsers(response);
      this.dataSource.data = filteredUsers;
      const name = this.authService.getUser().username;
      this.loggedInUsername = this.dataSource.data.find(
        (user) => user.username === name
      );
    });
  }

  getRoleNames(roles: any[]): string {
    return roles.map((role) => role.name).join(', ');
  }

  getBadgeNames(badges: any[]): string {
    return badges.map((badge) => badge.name).join(', ');
  }

  public openModal(element: any): any {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '20rem',
      disableClose: true,
      data: { user: element, isOnEdit: true },
    });
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      this.getAllUser();
    });
  }

  public deleteUser(userId: string): void {
    this.confirmActionModalService
      .openModal('Are you sure you want to remove this user from system?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(userId).subscribe(
            () => {
              this.toastr.success('User removed successfully');
              this.getAllUser();
            },
            (error) => {
              console.error('Error removing user', error);
              this.toastr.error('Failed to remove user');
            }
          );
        }
      });
  }
}
