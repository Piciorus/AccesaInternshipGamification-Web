import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { User } from 'src/app/libs/models/user.model';
import { QuestService } from 'src/app/libs/services/quest.service';
import { UserService } from 'src/app/libs/services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.scss'],
})
export class QuestsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  constructor() {}

  ngOnInit(): void {}

  // public onCreateQuestSubmit(): void {
  //   if (this.questForm?.invalid) return;
  //   const questToSave: Quest = this.questForm.value;
  //   this.questService
  //     .createQuest(questToSave, this.authService.getUser().id)
  //     .subscribe(
  //       (response) => {
  //         this.questList.push(response);
  //         this.questForm.get('answer')?.setValue('');
  //         this.questForm.get('description')?.setValue('');
  //         this.questForm.get('rewardTokens')?.setValue('');
  //         this.questForm.get('difficulty')?.setValue('');
  //         this.questForm.get('threshold')?.setValue('');
  //         this.message = 'Quest created successfully';
  //         this.authService.getMe().pipe(take(1)).subscribe((user: User) => {
  //           this.tokens = user.tokens;
  //         });
  //       },
  //       (error) => {
  //         if (error.status === 500) {
  //           this.message = 'Quest not created!You have not enough tokens';
  //         }
  //       }
  //     );
  // }
}
