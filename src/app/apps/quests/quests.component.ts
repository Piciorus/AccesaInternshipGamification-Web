import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/libs/AuthService/auth.service';
import { Quest } from 'src/app/libs/Models/Quest';
import { QuestService } from 'src/app/libs/Services/Quest/quest.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.scss']
})
export class QuestsComponent {
  public answer: any;
  public description: any;
  public questRewardTokens: any;
  public difficulty: any;
  public threshold: any;
  public questList: Array<Quest> = [];
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public constructor(private readonly questService:QuestService,private readonly authService:AuthService) { }

  public onCreateQuestSubmit(
    answer: string,
    description: string,
    questRewardTokens: number,
    difficulty: string,
    threshold: number
  ): void {
    this.questService
      .createQuest(
        answer,
        description,
        questRewardTokens,
        difficulty,
        threshold
      )
      .subscribe((response) => {
        this.questList.push(response);
        this.getQuests();
      });
  }

  public getQuests(): void {
    this.questService.getQuests().subscribe((response) => {
      this.questList = response;
    });
  }

}
