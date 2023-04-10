import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/AuthService/auth.service';
import { Badge } from 'src/app/libs/Models/Badge';
import { Quest } from 'src/app/libs/Models/Quest';
import { BadgeService } from 'src/app/libs/Services/Badge/badge.service';
import { QuestService } from 'src/app/libs/Services/Quest/quest.service';
import { UserService } from 'src/app/libs/Services/User/user.service';

@Component({
  selector: 'app-questlist',
  templateUrl: './questlist.component.html',
  styleUrls: ['./questlist.component.scss'],
})
export class QuestlistComponent {
  public questList: Array<Quest> = [];
  public badgeList: Array<Badge> = [];
  public barBadge: Array<Badge> = [];
  public threshold: any;
  public rewarded = false;
  public thresholdUser: any;
  public tokens: any;
  public userId: any;
  public user: any;

  public constructor(
    private readonly questService: QuestService,
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
    private readonly authService:AuthService
  ) {}

  public ngOnInit(): void {
    this.getQuests();
    this.getUser();
    const storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      this.tokens = storedTokens;
    }
  }

  public getUser(): void {
    this.user = this.authService.getUser();
    this.tokens = this.user.tokens;
    this.userId = this.user.id;
    this.thresholdUser = this.user.threshold;
    this.getBadgeFromUser(this.userId);
  }

  public getQuests(): void {
    this.questService.getQuests().subscribe((response) => {
      this.questList = response;
    });
  }

  public checkAnswer(answer: string, result: string): boolean {
    if (answer == result) {
      return true;
    } else {
      return false;
    }
  }

  public resolveQuest(idQuest: number, idUser: number): void {
    this.questService.resolveQuest(idQuest, idUser).subscribe((response) => {
      this.updateTokens(idUser, response.questRewardTokens);
      this.thresholdUser = this.thresholdUser + response.threshold;
      this.rewarded = true;
      this.updateRewarded(idQuest, this.rewarded);
      this.updateThreshold(idUser, this.thresholdUser);
      this.assignBadge(this.thresholdUser);
      this.getQuests();
    });
  }

  public updateThreshold(idUser: number, threshold: number): void {
    this.userService.updateThreshold(idUser, threshold).subscribe(() => {});
  }

  public updateRewarded(idQuest: number, rewarded: boolean): void {
    this.questService.updateRewarded(idQuest, rewarded).subscribe(() => {
      this.getQuests();
    });
  }

  public updateTokens(idUser: number, tokens: number): void {
    this.userService.updateTokens(idUser, tokens).subscribe((response) => {
      this.tokens = response.tokens;
      localStorage.setItem('tokens', response.tokens);
    });
  }

  public assignBadge(progress: number): void {
    if (progress >= 70) {
      const badgeId = this.barBadge[2]?.id;
      if (typeof badgeId === 'number') {
        this.rewardBadge(badgeId, this.userId);
      }
    } else if (progress >= 30 && progress < 70) {
      const badgeId = this.barBadge[1]?.id;
      if (typeof badgeId === 'number') {
        this.rewardBadge(badgeId, this.userId);
      }
    } else if (progress <= 30) {
      const badgeId = this.barBadge[0]?.id;
      if (typeof badgeId === 'number') {
        this.rewardBadge(badgeId, this.userId);
      }
    }
  }

  public rewardBadge(idBadge: number, idUser: number): void {
    this.userService.rewardBadge(idBadge, idUser).subscribe((response) => {
      this.getBadgeFromUser(idUser);
    });
  }

  public getBadgeFromUser(idUser: number): void {
    this.badgeService.getBadgesFromUser(idUser).subscribe((response) => {
      this.badgeList = response;
    });
  }
}
