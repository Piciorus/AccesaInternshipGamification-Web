import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { User } from 'src/app/libs/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/libs/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  public users: Array<User> = [];
  public user: any;
  public userId: any;
  displayedColumns: string[] = ['username', 'tokens','threshold'];

  dataSource = new MatTableDataSource<User>(this.users);

  public currentUserIndex: number | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllUser();
    this.user = this.authService.getUser();
    this.userId = this.user.id;
  }

  public getAllUser(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.dataSource.data = response;
    });
  }

  public getUsersSortedByTokensAscending(): void {
    this.userService.getUsersSortedByTokensAscending().subscribe((response: User[]) => {
      this.users = response;
    });
  }

  public getUsersSortedByTokensDescending(): void {
    this.userService
      .getUsersSortedByTokensDescending()
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
