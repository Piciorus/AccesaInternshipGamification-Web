import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Badge } from 'src/app/libs/models/badge';
import { User } from 'src/app/libs/models/user.model';
import { BadgeService } from 'src/app/libs/services/badge.service';
import { PlayTestComponent } from '../../play-test/play-test.component';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
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
  private dialogOpen = false;

  public constructor(
    private readonly badgeService: BadgeService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getBadges();
  }

  public getBadges(): void {
    this.badgeService.getAllBadges().subscribe((response: any) => {
      this.barBadge = response;
      this.getBadgeFromUser();
    });
  }

  private getBadgeFromUser(): void {
    const user: User = this.authService.getUser();
    this.badgeList.push(this.barBadge[0]);
    if (user.threshold && user.threshold >= 60)
      this.badgeList.push(this.barBadge[2]);
    if (user.threshold && user.threshold >= 90)
      this.badgeList.push(this.barBadge[1]);
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

  openModalCreateQuestion(): Observable<boolean | undefined> {
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
}
