import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';
import { ExamCategoryService } from 'src/app/services/examCategory.service';

@Component({
  selector: 'app-exam-category-view',
  templateUrl: './exam-category-view.component.html',
  styleUrls: ['./exam-category-view.component.css'],
})
export class ExamCategoryViewComponent {
  examId!: string;
  categoryId!: number;
  postForm!: FormGroup;
  category!: ExamCategoryInterface;

  constructor(
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
}
