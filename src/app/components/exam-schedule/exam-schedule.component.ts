import { Component, OnInit } from '@angular/core';
import { ExamScheduleInterface } from 'src/app/models/ExamSchedule.model';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css'],
})
export class ExamScheduleComponent implements OnInit {
  exams!: ExamScheduleInterface[];

  constructor(private scheduleService: ExamSceduleService) {}

  ngOnInit(): void {
    this.getAllExamSchedule();
  }

  getAllExamSchedule() {
    this.scheduleService.getExams().subscribe({
      next: (exams) => (this.exams = exams),
      error: () =>
        (this.exams = this.scheduleService.getExamsFromLocalStorage()),
    });
  }

  onDeleteExam(id: string) {
    if (!confirm('Are you sure you want to delete this exam?')) return;
    this.scheduleService.deleteExam(id).subscribe({
      error: () => {
        this.scheduleService.deleteExamFromLocalStorage(id);
        this.getAllExamSchedule();
      },
      complete: () => {
        alert('Exam deleted successfully!');
        this.getAllExamSchedule();
      },
    });
  }
}
