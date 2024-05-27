import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Quest } from 'src/app/libs/models/quest';
import { ConfirmActionModalService } from 'src/app/libs/services/confirmation-action-modal.sevice';
import { QuestionService } from 'src/app/libs/services/question.service';
import { CreateQuestionModalComponent } from '../home/create-question-modal/create-question-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { InfoQuestionComponent } from './info-question/info-question.component';

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
    'difficulty',
    'threshold',
    'questRewardTokens',
    'checkByAdmin',
    'category',
    'actions',
  ];

  columnHeaders: string[] = [
    'columnHeaders.questionText',
    'columnHeaders.answer1',
    'columnHeaders.answer2',
    'columnHeaders.answer3',
    'columnHeaders.correctAnswer',
    'columnHeaders.difficulty',
    'columnHeaders.threshold',
    'columnHeaders.questRewardTokens',
    'columnHeaders.checkByAdmin',
    'columnHeaders.category',
    'columnHeaders.actions',
  ];
  private translateColumnHeaders() {
    this.columnHeaders = this.columnHeaders.map((key) =>
      this.translate.instant(key)
    );
  }
  imageData = [
    { src: '../../../assets/society.png', category: 'Society & Culture' },
    { src: '../../../assets/science.png', category: 'Science & Mathematics' },
    { src: '../../../assets/health.png', category: 'Health' },
    { src: '../../../assets/education.png', category: 'Education & Reference' },
    { src: '../../../assets/computer.png', category: 'Computers & Internet' },
    { src: '../../../assets/sports.png', category: 'Sports' },
    { src: '../../../assets/business.png', category: 'Business & Finance' },
    { src: '../../../assets/music.png', category: 'Entertainment & Music' },
    { src: '../../../assets/family.png', category: 'Family & Relationships' },
    { src: '../../../assets/politics.png', category: 'Politics & Government' },
  ];

  dataSource = new MatTableDataSource<Quest>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly questionService: QuestionService,
    private _liveAnnouncer: LiveAnnouncer,
    private readonly dialog: MatDialog,
    private readonly toastr: ToastrService,
    private confirmActionModalService: ConfirmActionModalService,
    private translate: TranslateService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.translateColumnHeaders();
    this.initQuestions();
  }

  public getImagePath(category: string): string {
    const imageDataItem = this.imageData.find(
      (item) => item.category === category
    );
    return imageDataItem ? imageDataItem.src : '';
  }

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onCheckboxChange(checked: boolean, id: any, element: any) {
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
        category: element.category.name,
        checkedByAdmin: true,
      };
      this.questionService.updateQuestion(id, updateQuestionRequest).subscribe(
        (response) => {
          this.toastr.success('Question updated successfully');
        },
        (error) => {}
      );
    } else {
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
          this.toastr.success('Question updated successfully');
        },
        (error) => {}
      );
    }
  }
  openModalInfoQuestionComponent(question: any): void {
    const dialogRef = this.dialog.open(InfoQuestionComponent, {
      width: '600px',
      data: { question: question },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
  public openModal(element: Quest): any {
    const dialogRef: MatDialogRef<CreateQuestionModalComponent, boolean> =
      this.dialog.open(CreateQuestionModalComponent, {
        width: '38rem',
        disableClose: true,
        data: { question: element, isOnEdit: true },
      });
    dialogRef.componentInstance.questionCreatedOrUpdated.subscribe(() => {
      this.initQuestions();
    });
  }

  public deleteQuestion(questionId: string): void {
    this.confirmActionModalService
      .openModal('Are you sure you want to delete this question?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.questionService.deleteQuestion(questionId).subscribe(
            () => {
              this.toastr.success('Question deleted successfully');
              this.initQuestions();
            },
            (error) => {
              console.error('Error deleting question', error);
              this.toastr.error('Failed to delete question');
            }
          );
        }
      });
  }

  private initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response: Quest[]) => {
        this.dataSource.data = response;
      });
  }
}
