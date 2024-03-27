import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Question } from 'src/app/libs/models/question';
import { QuestionService } from 'src/app/libs/services/question.service';

@Component({
  selector: 'app-create-question-modal',
  templateUrl: './create-question-modal.component.html',
  styleUrls: ['./create-question-modal.component.scss'],
})
export class CreateQuestionModalComponent {
  public question: Question = new Question();
  public questForm: FormGroup;
  public message: string = '';
  public tokens: any;
  public questList: Array<any> = [];
  public statistics: any;

  public constructor(
    private readonly questService: QuestionService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

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
      rewardTokens: this.questForm.get('rewardTokens')?.value,
    };
    this.questService.createQuestion(questToSave).subscribe(
      (response) => {
        this.questList.push(response);
        this.questForm.reset(); // Reset the form state
        this.message = 'Question created successfully';
        this.dialog.closeAll();
      },
      (error) => {
        if (error.status === 500) {
          this.message = 'Quest not created!You have not enough tokens';
        }
      }
    );
  }

  public ngOnInit(): void {
    this.questForm = this.initForm();
    this.tokens = this.authService.getUser().tokens;
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      questionText: [this.question.questionText, Validators.required],
      answer1: [this.question.answer1, Validators.required],
      answer2: [this.question.answer2, Validators.required],
      answer3: [this.question.answer3, Validators.required],
      correctAnswer: [this.question.correctAnswer, Validators.required],
      difficulty: [this.question.difficulty, Validators.required],
      threshold: [this.question.threshold, Validators.required],
      rewardTokens: [this.question.rewardTokens, Validators.required],
    });
  }

  public closeModal() {
    this.dialog.closeAll();
  }
}
