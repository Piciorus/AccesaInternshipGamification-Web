import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Question } from 'src/app/libs/models/question';
import { ChatGptService } from 'src/app/libs/services/chatgpt.service';
import { QuestionService } from 'src/app/libs/services/question.service';
import { take } from 'rxjs';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-create-question-modal',
  templateUrl: './create-question-modal.component.html',
  styleUrls: ['./create-question-modal.component.scss'],
})
export class CreateQuestionModalComponent {
  @Output() questionCreatedOrUpdated = new EventEmitter<void>();
  public question: Question = new Question();
  public questForm: FormGroup;
  public message: string = '';
  public tokens: any;
  public statistics: any;
  public predictedCategory!: string | null;
  public questionEdit!: Question;

  public constructor(
    private readonly questService: QuestionService,
    private readonly authService: AuthService,
    private readonly chatGptService: ChatGptService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionEdit = data?.question;
  }

  public ngOnInit(): void {
    this.questForm = this.initForm();
    this.tokens = this.authService.getUser().tokens;
    this.questionEdit = this.data?.question;
  }

  public onCreateQuestionSubmit(): void {
    if (this.questForm?.invalid) return;
    const questToSave: Question = {
      questionText: this.questForm.get('questionText')?.value,
      answer1: this.questForm.get('answer1')?.value,
      answer2: this.questForm.get('answer2')?.value,
      answer3: this.questForm.get('answer3')?.value,
      correctAnswer: this.questForm.get('correctAnswer')?.value,
      difficulty: this.questForm.get('difficulty')?.value,
      threshold: this.questForm.get('threshold')?.value,
      questRewardTokens: this.questForm.get('questRewardTokens')?.value,
      category: this.questForm.get('category')?.value,
    };
    const isFormEdited = this.isFormEdited();

    const observer = {
      next: (response: { status: number }) => {
        this.closeModal();
        if (this.data?.isOnEdit) {
          this.questionCreatedOrUpdated.emit();
          this.toastr.success('Question updated successfully');
        } else {
          this.toastr.success('Question created successfully');
        }
      },
      error: (error: any) => {
        if (error.status === 500) {
          this.toastr.error('Quest not created! You have not enough tokens');
        } else {
          this.toastr.error('An error occurred while processing your request');
        }
      },
    };
    if (this.data?.isOnEdit && isFormEdited) {
      this.questService
        .updateQuestion(this.data.question.id, questToSave)
        .pipe(take(1))
        .subscribe(observer);
    } else if (!this.data?.isOnEdit) {
      this.questService
        .createQuestion(questToSave)
        .pipe(take(1))
        .subscribe(observer);
    }
  }

  public onMouseOverCategory() {
    const requestData = {
      question: this.questForm.get('questionText')?.getRawValue(),
    };

    this.chatGptService
      .predictCategory(requestData)
      .subscribe((response: any) => {
        this.predictedCategory = response.predicted_category;
        this.dialog
          .open(CategoryDialogComponent, {
            data: { predictedCategory: this.predictedCategory },
          })
          .afterClosed()
          .subscribe(() => {
            this.questForm.patchValue({ category: this.predictedCategory });
          });
      });
  }

  public closeModal() {
    this.dialog.closeAll();
  }

  private isFormEdited(): boolean {
    const formValues = this.questForm.value;
    const originalValues = this.questionEdit;

    return (
      formValues.questionText !== originalValues?.questionText ||
      formValues.answer1 !== originalValues.answer1 ||
      formValues.answer2 !== originalValues.answer2 ||
      formValues.answer3 !== originalValues.answer3 ||
      formValues.correctAnswer !== originalValues.correctAnswer ||
      formValues.difficulty !== originalValues.difficulty ||
      formValues.threshold !== originalValues.threshold ||
      formValues.questRewardTokens !== originalValues.questRewardTokens ||
      formValues.category !== originalValues.category?.name
    );
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      questionText: [
        this.data?.isOnEdit ? this.questionEdit.questionText : '',
        Validators.required,
      ],
      answer1: [
        this.data?.isOnEdit ? this.questionEdit.answer1 : '',
        Validators.required,
      ],
      answer2: [
        this.data?.isOnEdit ? this.questionEdit.answer2 : '',
        Validators.required,
      ],
      answer3: [
        this.data?.isOnEdit ? this.questionEdit.answer3 : '',
        Validators.required,
      ],
      correctAnswer: [
        this.data?.isOnEdit ? this.questionEdit.correctAnswer : '',
        Validators.required,
      ],
      difficulty: [
        this.data?.isOnEdit ? this.questionEdit.difficulty : '',
        Validators.required,
      ],
      threshold: [
        this.data?.isOnEdit ? this.questionEdit.threshold : '',
        Validators.required,
      ],
      questRewardTokens: [
        this.data?.isOnEdit ? this.questionEdit.questRewardTokens : '',
        Validators.required,
      ],
      category: [
        this.data?.isOnEdit ? this.questionEdit.category?.name : '',
        Validators.required,
      ],
    });
  }
}
