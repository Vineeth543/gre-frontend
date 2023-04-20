import { Component } from '@angular/core';
import { ExamScheduleInterface } from 'src/app/models/ExamSchedule.model';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css'],
})
export class ExamScheduleComponent {
  exams: ExamScheduleInterface[] = [
    {
      examId: '6a280a3e-aa0b-414d-b265-ab7dc1b45120',
      examName: 'Sample Exam 1',
      examDate: '2023-05-01T10:00:00',
      durationInMinutes: 120,
      instructions: 'Read all questions carefully.',
      startTime: '2023-05-01T09:00:00',
    },
    {
      examId: 'cb503722-1219-4c3e-9853-9811f03b161e',
      examName: 'Sample Exam 2',
      examDate: '2023-06-01T10:00:00',
      durationInMinutes: 160,
      instructions: 'Read all questions carefully.',
      startTime: '2023-06-01T09:00:00',
    },
    {
      examId: 'd0b5b5e1-5b1f-4b9a-9b1e-5e1b5b9a9b1e',
      examName: 'Sample Exam 3',
      examDate: '2023-07-01T10:00:00',
      durationInMinutes: 180,
      instructions: 'Read all questions carefully.',
      startTime: '2023-07-01T09:00:00',
    },
  ];

  onDeleteexam(id: string) {}
}
