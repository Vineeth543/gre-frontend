import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExamCategoryInterface } from 'src/app/models/ExamCategory.model';
import { ExamQuestionInterface } from 'src/app/models/ExamQuestion.model';
import { ExamScheduleInterface } from 'src/app/models/ExamSchedule.model';
import { ExamSceduleService } from 'src/app/services/examSchedule.service';
import { ExamCategoryService } from 'src/app/services/examCategory.service';
import { ExamQuestionService } from 'src/app/services/examQuestion.service';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.css'],
})
export class ExamQuestionComponent implements OnInit {
  examId!: string;
  categoryId!: number;
  questionId!: number;
  examSchedules!: ExamScheduleInterface[];
  examCategories!: ExamCategoryInterface[];
  examQuestions!: ExamQuestionInterface[];

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ExamSceduleService,
    private categoryService: ExamCategoryService,
    private questionService: ExamQuestionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.examId = params.get('examId')!;
      this.questionId = +params.get('questionId')!;
      this.categoryId = +params.get('categoryId')!;
      if (this.categoryId) {
        this.getAllExamQuestion();
      } else if (this.examId) {
        this.getAllExamCategoryByExamId();
      } else {
        this.getAllExamSchedule();
      }
    });
  }

  getAllExamSchedule() {
    this.scheduleService.getExams().subscribe({
      next: (exams) => (this.examSchedules = exams),
      error: () =>
        (this.examSchedules = this.scheduleService.getExamsFromLocalStorage()),
    });
  }

  getAllExamCategoryByExamId() {
    this.categoryService.getExamCategoriesByExamId(this.examId).subscribe({
      next: (exams) => (this.examCategories = exams),
      error: () =>
        (this.examCategories =
          this.categoryService.getExamCategoriesByExamIdFromLocalStorage(
            this.examId
          )),
    });
  }

  getAllExamQuestion() {
    this.questionService
      .getExamQuestionsByExamAndCaregoryId(this.examId, this.categoryId)
      .subscribe({
        next: (exams) => (this.examQuestions = exams),
        error: () =>
          (this.examQuestions =
            this.questionService.getExamQuestionsByExamAndCaregoryIdFromLocalStorage(
              this.examId,
              this.categoryId
            )),
      });
  }

  onDeleteQuestion(examId: string, categoryId: number, questionId: number) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    this.questionService
      .deleteExamQuestion(examId, +categoryId, +questionId)
      .subscribe({
        error: () => {
          this.questionService.deleteExamQuestionFromLocalStorage(
            examId,
            +categoryId,
            +questionId
          );
          this.getAllExamQuestion();
        },
        complete: () => {
          alert('Question deleted successfully!');
          this.getAllExamQuestion();
        },
      });
  }
}
