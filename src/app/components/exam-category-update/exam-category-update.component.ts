import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';
import { ExamCategoryService } from 'src/app/services/examCategory.service';

@Component({
  selector: 'app-exam-category-update',
  templateUrl: './exam-category-update.component.html',
  styleUrls: ['./exam-category-update.component.css'],
})
export class ExamCategoryUpdateComponent {
  examId!: string;
  categoryId!: number;
  postForm!: FormGroup;
  category!: ExamCategoryInterface;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: ExamCategoryService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    this.getExamCategoryById();

    this.postForm = new FormGroup({
      numberOfQuestions: new FormControl(null, [Validators.required]),
      typeOfQuestion: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
      positiveMark: new FormControl(null, [Validators.required]),
      negativeMark: new FormControl(null, [Validators.required]),
    });
  }

  getExamCategoryById() {
    this.categoryService
      .getExamCategoryById(this.examId, +this.categoryId)
      .subscribe({
        next: (category) => this.postForm.patchValue(category),
        error: () =>
          this.postForm.patchValue(
            this.categoryService.getExamCategoryByIdFromLocalStorage(
              this.examId,
              +this.categoryId
            )
          ),
      });
  }

  updateExamCategory() {
    if (this.postForm.invalid) return;
    this.categoryService
      .updateExamCategory(this.examId, +this.categoryId, this.postForm.value)
      .subscribe({
        error: () => {
          this.categoryService.updateExamCategoryInLocalStorage(
            this.examId,
            +this.categoryId,
            this.postForm.value
          );
          this.postForm.reset();
          this.router.navigate(['/category']);
        },
        complete: () => {
          alert('Exam updated successfully!');
          this.postForm.reset();
          this.router.navigate(['/category']);
        },
      });
  }
}
