import { Component, OnInit } from '@angular/core';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';
import { ExamCategoryService } from 'src/app/services/examCategory.service';

@Component({
  selector: 'app-exam-category',
  templateUrl: './exam-category.component.html',
  styleUrls: ['./exam-category.component.css'],
})
export class ExamCategoryComponent implements OnInit {
  exams!: ExamCategoryInterface[];

  constructor(private categoryService: ExamCategoryService) {}

  ngOnInit(): void {
    this.getAllExamCategory();
  }

  getAllExamCategory() {
    this.categoryService.getAllExamCategories().subscribe({
      next: (exams) => (this.exams = exams),
      error: () =>
        (this.exams = this.categoryService.getExamCategoriesFromLocalStorage()),
    });
  }

  onDeleteExamCategory(examId: string, sectionId: number) {
    if (!confirm('Are you sure you want to delete this exam?')) return;
    this.categoryService.deleteExamCategory(examId, sectionId).subscribe({
      error: () => {
        this.categoryService.deleteExamCategoryFromLocalStorage(
          examId,
          sectionId
        );
        this.getAllExamCategory();
      },
      complete: () => {
        alert('Category deleted successfully!');
        this.getAllExamCategory();
      },
    });
  }
}
