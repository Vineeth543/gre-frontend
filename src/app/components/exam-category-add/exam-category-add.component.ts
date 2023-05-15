import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';
import { ExamScheduleInterface } from 'src/app/models/ExamSchedule.model';
import { ExamCategoryService } from 'src/app/services/examCategory.service';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';

@Component({
  selector: 'app-exam-category-add',
  templateUrl: './exam-category-add.component.html',
  styleUrls: ['./exam-category-add.component.css'],
})
export class ExamCategoryAddComponent {
  postForm!: FormGroup;
  examSchedule!: ExamScheduleInterface[];
  examCategory!: ExamCategoryInterface[];

  constructor(
    private router: Router,
    private scheduleService: ExamSceduleService,
    private categoryService: ExamCategoryService
  ) {}

  ngOnInit(): void {
    this.getAllExamSchedule();

    this.getAllExamCategory();

    this.postForm = new FormGroup({
      examId: new FormControl(null, [Validators.required]),
      numberOfQuestions: new FormControl(null, [Validators.required]),
      typeOfQuestion: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
      positiveMark: new FormControl(null, [Validators.required]),
      negativeMark: new FormControl(null, [Validators.required]),
    });
  }

  getAllExamSchedule() {
    this.scheduleService.getExams().subscribe({
      next: (exams) => (this.examSchedule = exams),
      error: () =>
        (this.examSchedule = this.scheduleService.getExamsFromLocalStorage()),
    });
  }

  getAllExamCategory() {
    this.categoryService.getAllExamCategories().subscribe({
      next: (exams) => (this.examCategory = exams),
      error: () =>
        (this.examCategory =
          this.categoryService.getExamCategoriesFromLocalStorage()),
    });
  }

  onAddExamCategory() {
    if (this.postForm.invalid) return;

    let count = 0;
    this.examCategory.forEach((exam) =>
      exam.examId == this.postForm.value.examId ? count++ : count
    );
    this.postForm.value.sectionId = count + 1;

    this.categoryService.createExamCategory(this.postForm.value).subscribe({
      error: () => {
        this.categoryService.addExamCategoryToLocalStorage(this.postForm.value);
        this.postForm.reset();
        this.router.navigate(['/category']);
      },
      complete: () => {
        alert('Category created successfully!');
        this.postForm.reset();
        this.router.navigate(['/category']);
      },
    });
  }
}
