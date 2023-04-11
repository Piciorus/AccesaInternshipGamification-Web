import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Badge } from 'src/app/libs/models/badge';
import { User } from 'src/app/libs/models/user.model';
import { BadgeService } from 'src/app/libs/services/badge.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  @Input() public statistics: any;
  @Output() public newItemEvent: EventEmitter<string> = new EventEmitter<string>();
  public badgeList: Array<Badge> = [];
  public barBadge: Array<Badge> = [];

  public constructor(
    private readonly badgeService: BadgeService,
    private readonly authService: AuthService,
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
    if(user.threshold && user.threshold >= 60) this.badgeList.push(this.barBadge[1]);
    if(user.threshold && user.threshold >= 90) this.badgeList.push(this.barBadge[2]); 
  }
}
