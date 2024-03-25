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

  public closeModal(){
    this.dialog.closeAll();
  }
}
