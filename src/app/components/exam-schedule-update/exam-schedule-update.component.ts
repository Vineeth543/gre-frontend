import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';

@Component({
  selector: 'app-exam-schedule-update',
  templateUrl: './exam-schedule-update.component.html',
  styleUrls: ['./exam-schedule-update.component.css'],
})
export class ExamScheduleUpdateComponent implements OnInit {
  postId!: string;
  postForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ExamSceduleService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];

    this.getExamById(this.postId);

    this.postForm = new FormGroup({
      examName: new FormControl(null, [Validators.required]),
      examDate: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
      instructions: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
    });
  }

  getExamById(id: string) {
    this.scheduleService.getExamById(id).subscribe({
      next: (exam) => this.postForm.patchValue(exam),
      error: () =>
        this.postForm.patchValue(
          this.scheduleService.getExamByIdFromLocalStorage(id)
        ),
    });
  }

  updateExam() {
    if (this.postForm.invalid) return;
    this.scheduleService
      .updateExam(this.postId, this.postForm.value)
      .subscribe({
        error: () => {
          this.scheduleService.updateExamInLocalStorage(
            this.postId,
            this.postForm.value
          );
          this.postForm.reset();
          this.router.navigate(['/schedule']);
        },
        complete: () => {
          alert('Exam updated successfully!');
          this.postForm.reset();
          this.router.navigate(['/schedule']);
        },
      });
  }
}
