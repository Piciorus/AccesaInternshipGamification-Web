import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Badge, CreateBadge } from 'src/app/libs/models/Badge';
import { User } from 'src/app/libs/models/user';
import { BadgeService } from 'src/app/libs/services/badge.service';
import { PlayTestComponent } from '../../play-test/play-test.component';
import { CreateQuestionModalComponent } from '../create-question-modal/create-question-modal.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  @Input() public statistics: any;
  @Output() public newItemEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @ViewChild('selectDropdown') selectDropdown: MatSelect;

  public badgeList: Array<Badge> = [];
  public barBadge: Array<Badge> = [];
  public dialogOpen = false;
  public circleProgressValue: number = 0;

  public constructor(
    private readonly badgeService: BadgeService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getBadges();
    this.getBadgeFromUser();
  }

  public createBadge(badge: CreateBadge, userId: string): void {
    this.badgeService.createBadge(badge, userId).subscribe((response: any) => {
      this.barBadge = response;
      this.getBadgeFromUser();
    });
  }

  public calculateProgress(): any {
    const user: User = this.authService.getUser();
    if (user && user.threshold !== undefined) {
      if (user.threshold < 100) {
        return (user.threshold / 100) * 100;
      } else if (user.threshold >= 100 && user.threshold < 200) {
        return ((user.threshold - 100) / 100) * 100;
      } else if (user.threshold >= 200) {
        return 100;
      }
    } else {
      return 0;
    }
  }

  public openModal(): Observable<boolean | undefined> {
    if (this.dialogOpen) {
      return of();
    }

    const dialogRef: MatDialogRef<PlayTestComponent, boolean> =
      this.dialog.open(PlayTestComponent, {
        width: '35rem',
        disableClose: true,
      });

    dialogRef.afterOpened().subscribe(() => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });

    return dialogRef.afterClosed();
  }

  public openModalCreateQuestion(): Observable<boolean | undefined> {
    if (this.dialogOpen) {
      return of();
    }

    const dialogRef: MatDialogRef<CreateQuestionModalComponent, boolean> =
      this.dialog.open(CreateQuestionModalComponent, {
        width: '38rem',
        disableClose: true,
      });

    dialogRef.afterOpened().subscribe(() => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });

    return dialogRef.afterClosed();
  }

  private getBadgeFromUser(): void {
    const user: User = this.authService.getUser();
    const id = this.authService.getUser().id;
    this.badgeList.push(this.barBadge[0]);
    if (user.threshold && user.threshold >= 100)
      this.badgeList.push(this.barBadge[1]);
    if (user.threshold && user.threshold >= 200)
      this.badgeList.push(this.barBadge[2]);
  }

  private getBadges(): void {
    this.badgeService.getAllBadges().subscribe((response: any) => {
      this.barBadge = response;
      this.getBadgeFromUser();
    });
  }
}
