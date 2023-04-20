import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-schedule-add',
  templateUrl: './exam-schedule-add.component.html',
  styleUrls: ['./exam-schedule-add.component.css'],
})
export class ExamScheduleAddComponent {
  postForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      examId: new FormControl(null, [Validators.required]),
      numberOfQuestions: new FormControl(null, [Validators.required]),
      typeOfQuestion: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
      positiveMark: new FormControl(null, [Validators.required]),
      negativeMark: new FormControl(null, [Validators.required]),
    });
  }

  onAddExamCategory() {}
}
