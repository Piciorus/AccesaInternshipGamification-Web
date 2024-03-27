import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Quest } from 'src/app/libs/models/quest';
import { QuestionService } from 'src/app/libs/services/question.service';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.scss'],
})
export class QuestsComponent implements OnInit {
  displayedColumns: string[] = [
    'questionText',
    'answer1',
    'answer2',
    'answer3',
    'correctAnswer',
    'rewarded',
    'difficulty',
    'threshold',
    'questRewardTokens',
    'checkByAdmin',
    'category',
  ];

  columnHeaders: string[] = [
    'Question Text',
    'First Answer',
    'Second Answer',
    'Third Answer',
    'Correct Answer',
    'Rewarded',
    'Difficulty',
    'Threshold',
    'Tokens',
    'Checked',
    'Category',
  ];

  dataSource = new MatTableDataSource<Quest>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly questionService: QuestionService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response: Quest[]) => {
        this.dataSource.data = response;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onCheckboxChange(checked: boolean, id: any, element: any) {
    console.log(element);
    if (checked) {

    const updateQuestionRequest: any = {
      questionText: element.questionText,
      answer1: element.answer1,
      answer2: element.answer2,
      answer3: element.answer3,
      correctAnswer: element.correctAnswer,
      difficulty: element.difficulty,
      threshold: element.threshold,
      rewardTokens: element.rewardTokens,
      checkedByAdmin: true,
    };
      this.questionService.updateQuestion(id, updateQuestionRequest).subscribe(
        (response) => {
          console.log('Question updated successfully', response);
        },
        (error) => {
          console.error('Error updating question', error);
        }
      );
    }else{
      const updateQuestionRequest: any = {
        questionText: element.questionText,
        answer1: element.answer1,
        answer2: element.answer2,
        answer3: element.answer3,
        correctAnswer: element.correctAnswer,
        difficulty: element.difficulty,
        threshold: element.threshold,
        rewardTokens: element.rewardTokens,
        checkedByAdmin: false,
      };
        this.questionService.updateQuestion(id, updateQuestionRequest).subscribe(
          (response) => {
            console.log('Question updated successfully', response);
          },
          (error) => {
            console.error('Error updating question', error);
          }
        );
    }
  }
}
