import { Component } from '@angular/core';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';

@Component({
  selector: 'app-exam-category',
  templateUrl: './exam-category.component.html',
  styleUrls: ['./exam-category.component.css'],
})
export class ExamCategoryComponent {
  exams: ExamCategoryInterface[] = [
    {
      sectionId: 1,
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      numberOfQuestions: 10,
      typeOfQuestion: 'True or False',
      durationInMinutes: 60,
      positiveMark: 2.0,
      negativeMark: 0.0,
    },
    {
      sectionId: 2,
      examId: 'cb503722-1219-4c3e-9853-9811f03b161e',
      numberOfQuestions: 10,
      typeOfQuestion: 'Fill in the blanks',
      durationInMinutes: 60,
      positiveMark: 2.0,
      negativeMark: 0.0,
    },
    {
      sectionId: 3,
      examId: 'd0b5b5e1-5b1f-4b9a-9b1e-5e1b5b9a9b1e',
      numberOfQuestions: 10,
      typeOfQuestion: 'Multiple Choice',
      durationInMinutes: 60,
      positiveMark: 2.0,
      negativeMark: 0.0,
    },
  ];

  onDeleteexam(id: number) {}
}
