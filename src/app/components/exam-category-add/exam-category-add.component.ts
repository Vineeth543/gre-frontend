import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-category-add',
  templateUrl: './exam-category-add.component.html',
  styleUrls: ['./exam-category-add.component.css'],
})
export class ExamCategoryAddComponent {
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
