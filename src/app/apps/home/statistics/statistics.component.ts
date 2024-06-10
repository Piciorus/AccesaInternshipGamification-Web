import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Badge, CreateBadge } from 'src/app/libs/models/Badge';
import { BadgeService } from 'src/app/libs/services/badge.service';
import { PlayTestComponent } from '../../play-test/play-test.component';
import { CreateQuestionModalComponent } from '../create-question-modal/create-question-modal.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnChanges {
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
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['statistics'] && changes['statistics'].currentValue) {
      this.updateBadgeList();
      this.circleProgressValue = this.calculateProgress();
    }
  }

  public createBadge(badge: CreateBadge, userId: string): void {
    this.badgeService.createBadge(badge, userId).subscribe((response: any) => {
      this.barBadge = response;
      this.updateBadgeList();
    });
  }

  public calculateProgress(): number {
    const threshold = this.statistics?.thresholdUser;
    if (threshold !== undefined) {
      if (threshold < 100) {
        return (threshold / 100) * 100;
      } else if (threshold >= 100 && threshold < 200) {
        return ((threshold - 100) / 100) * 100;
      } else if (threshold >= 200) {
        return 100;
      }
    }
    return 0;
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

  private updateBadgeList(): void {
    this.badgeList = [];
    const threshold = this.statistics?.thresholdUser;
    if (threshold !== undefined) {
      if (threshold < 100 && this.barBadge[0]) {
        this.badgeList.push(this.barBadge[0]);
      } else if (threshold >= 100 && threshold < 200 && this.barBadge[1]) {
        this.badgeList.push(this.barBadge[0], this.barBadge[1]);
      } else if (threshold >= 200 && this.barBadge[2]) {
        this.badgeList.push(
          this.barBadge[0],
          this.barBadge[1],
          this.barBadge[2]
        );
      }
    }
  }

  private getBadges(): void {
    this.badgeService.getAllBadges().subscribe((response: any) => {
      this.barBadge = response;
      this.updateBadgeList();
    });
  }
}
