import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-question',
  templateUrl: './info-question.component.html',
  styleUrls: ['./info-question.component.scss'],
})
export class InfoQuestionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
