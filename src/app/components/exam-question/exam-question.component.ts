import { Component } from '@angular/core';
import { ExamQuestionInterface } from 'src/app/models/ExamQuestion.model';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.css'],
})
export class ExamQuestionComponent {
  exams: ExamQuestionInterface[] = [
    {
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      sectionId: 1,
      examQuestionId: 52,
      question: 'Which planet is closest to the sun?',
      options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
      correctOptionIndex: 1,
    },
    {
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      sectionId: 2,
      examQuestionId: 103,
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
      correctOptionIndex: 1,
    },
    {
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      sectionId: 3,
      examQuestionId: 154,
      question: 'Which is the largest country in the world?',
      options: ['Russia', 'Canada', 'China', 'United States'],
      correctOptionIndex: 0,
    },
    {
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      sectionId: 4,
      examQuestionId: 205,
      question: 'Which is the largest ocean in the world?',
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Pacific Ocean',
        'Arctic Ocean',
      ],
      correctOptionIndex: 2,
    },
  ];

  onDeleteexam(id: number) {}
}
