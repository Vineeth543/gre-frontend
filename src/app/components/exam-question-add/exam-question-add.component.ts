import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamQuestionInterface } from 'src/app/models/ExamQuestion.model';
import { ExamQuestionService } from 'src/app/services/examQuestion.service';

@Component({
  selector: 'app-exam-question-add',
  templateUrl: './exam-question-add.component.html',
  styleUrls: ['./exam-question-add.component.css'],
})
export class ExamQuestionAddComponent {
  postForm!: FormGroup;
  examId!: string;
  questionId!: number;
  categoryId!: number;
  examQuestions!: ExamQuestionInterface[];

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
      question: new FormControl(null, [Validators.required]),
      options: new FormControl(null, [Validators.required]),
      correctOptionIndex: new FormControl(null, [Validators.required]),
    });

    this.getAllExamQuestion();
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

  onAddExamQuestion() {
    if (this.postForm.invalid) return;

    this.postForm.value.examQuestionId = +this.examQuestions.length + 1;
    this.postForm.value.options = this.postForm.value.options.split(',');
    this.postForm.value.correctOptionIndex =
      +this.postForm.value.correctOptionIndex;

    this.questionService
      .addExamQuestion(this.examId, +this.categoryId, this.postForm.value)
      .subscribe({
        error: () => {
          this.questionService.addExamQuestionToLocalStorage(
            this.examId,
            +this.categoryId,
            this.postForm.value
          );
          this.postForm.reset();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        complete: () => {
          alert('Question created successfully!');
          this.postForm.reset();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
  }
}
