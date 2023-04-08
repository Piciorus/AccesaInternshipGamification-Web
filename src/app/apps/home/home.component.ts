import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/AuthService/auth.service';
import { Badge } from 'src/app/libs/Models/Badge';
import { Quest } from 'src/app/libs/Models/Quest';
import { User } from 'src/app/libs/Models/User';
import { BadgeService } from 'src/app/libs/Services/Badge/badge.service';
import { QuestService } from 'src/app/libs/Services/Quest/quest.service';
import { UserService } from 'src/app/libs/Services/User/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public questList: Array<Quest> = [];
  public badgeList: Array<Badge> = [];
  public user: any;
  public tokens: any;
  public answer: any;
  public description: any;
  public badges: any;
  public questRewardTokens: any;
  public userId: any;
  public rewarded = false;

  constructor(
    private badgeService: BadgeService,
    private questService: QuestService,
    private authService: AuthService,
    private userService:UserService
  ) {}

  public getQuests() {
    this.questService.getQuests().subscribe((response) => {
      this.questList = response;
    });
  }

  public checkAnswer(a: string, b: string) {
    if (a == b) {
      return true;
    } else {
      return false;
    }
  }

  public getUser() {
    this.user = this.authService.getUser();
    this.tokens = this.user.tokens;
    this.userId = this.user.id;
    this.getBadgeFromUser(this.user.id);
  }

  public getBadgeFromUser(idUser: number) {
    this.badgeService.getBadgesFromUser(idUser).subscribe((response) => {
      this.badgeList = response;
    });
  }

  ngOnInit(): void {
    this.getQuests();
    this.getUser();
    const storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      this.tokens = storedTokens;
    }
  }

  public async logout() {
    this.authService.logout();
  }

  public createQuest(
    answer: string,
    desciption: string,
    questRewardTokens: number,
    badges: string
  ) {
    this.questService
      .createQuest(answer, desciption, questRewardTokens, badges)
      .subscribe((res) => {});
  }

  public updateTokens(idUser: number, tokens: number) {
    this.userService.updateTokens(idUser, tokens).subscribe((response) => {
      this.tokens = response.tokens;
      localStorage.setItem('tokens', response.tokens);
    });
  }

  public rewardBadge(idBadge: number, idUser: number) {
    this.userService.rewardBadge(idBadge, idUser).subscribe((response) => {
      this.getBadgeFromUser(idUser);
    });
  }

  public resolveQuest(idQuest: number, idUser: number) {
    this.questService.resolveQuest(idQuest, idUser).subscribe((response) => {
      this.updateTokens(idUser, response.questRewardTokens);
      this.rewardBadge(response.badges.id, idUser);
      this.rewarded = true;
    });
  }

  public onCreateQuestSubmit(
    answer: string,
    description: string,
    questRewardTokens: number,
    badges: string
  ) {
    this.questService
      .createQuest(answer, description, questRewardTokens, badges)
      .subscribe((response) => {
        this.questList.push(response);
        this.getQuests();
      });
  }
}
