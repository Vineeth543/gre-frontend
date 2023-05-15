import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamScheduleInterface } from 'src/app/models/ExamSchedule.model';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';

@Component({
  selector: 'app-exam-schedule-add',
  templateUrl: './exam-schedule-add.component.html',
  styleUrls: ['./exam-schedule-add.component.css'],
})
export class ExamScheduleAddComponent {
  postForm!: FormGroup;

  constructor(
    private router: Router,
    private scheduleService: ExamSceduleService
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      examName: new FormControl(null, [Validators.required]),
      examDate: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
      instructions: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
    });
  }

  onAddExamCategory() {
    if (this.postForm.invalid) return;
    this.scheduleService.createExam(this.postForm.value).subscribe({
      error: () => {
        this.scheduleService.createExamInLocalStorage(this.postForm.value);
        this.postForm.reset();
        this.router.navigate(['/schedule']);
      },
      complete: () => {
        alert('Exam created successfully!');
        this.postForm.reset();
        this.router.navigate(['/schedule']);
      },
    });
  }
}
