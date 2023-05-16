import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamQuestionService } from 'src/app/services/examQuestion.service';

@Component({
  selector: 'app-exam-question-update',
  templateUrl: './exam-question-update.component.html',
  styleUrls: ['./exam-question-update.component.css'],
})
export class ExamQuestionUpdateComponent {
  postForm!: FormGroup;
  examId!: string;
  questionId!: number;
  categoryId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: ExamQuestionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.examId = params.get('examId')!;
      this.questionId = +params.get('questionId')!;
      this.categoryId = +params.get('categoryId')!;
    });

    this.postForm = new FormGroup({
      question: new FormControl(null),
      options: new FormControl(null),
      correctOptionIndex: new FormControl(null),
    });

    this.getExamQuestionByQuestionId();
  }

  getExamQuestionByQuestionId() {
    this.questionService
      .getExamQuestionByQuestionId(
        this.examId,
        +this.categoryId,
        +this.questionId
      )
      .subscribe({
        next: (question) => this.postForm.patchValue(question),
        error: () =>
          this.postForm.patchValue(
            this.questionService.getExamQuestionByQuestionIdFromLocalStorage(
              this.examId,
              +this.categoryId,
              +this.questionId
            )
          ),
      });
  }

  updateExamQuestion() {
    this.questionService
      .updateExamQuestion(
        this.examId,
        +this.categoryId,
        +this.questionId,
        this.postForm.value
      )
      .subscribe({
        error: () => {
          this.questionService.updateExamQuestionInLocalStorage(
            this.examId,
            +this.categoryId,
            +this.questionId,
            this.postForm.value
          );
          this.postForm.reset();
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        complete: () => {
          alert('Exam question updated successfully!');
          this.postForm.reset();
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
  }
}
