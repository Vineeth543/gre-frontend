import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';

@Component({
  selector: 'app-exam-schedule-view',
  templateUrl: './exam-schedule-view.component.html',
  styleUrls: ['./exam-schedule-view.component.css'],
})
export class ExamScheduleViewComponent {
  postForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ExamSceduleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.getExamById(id);

    this.postForm = new FormGroup({
      examId: new FormControl(null),
      examName: new FormControl(null),
      examDate: new FormControl(null),
      durationInMinutes: new FormControl(null),
      instructions: new FormControl(null),
      startTime: new FormControl(null),
    });
  }

  getExamById(id: string) {
    this.scheduleService.getExamById(id).subscribe({
      next: (exam) => this.postForm.patchValue(exam),
      error: () =>
        this.postForm.setValue(
          this.scheduleService.getExamByIdFromLocalStorage(id)
        ),
    });
  }
}
