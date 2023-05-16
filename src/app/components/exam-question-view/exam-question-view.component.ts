import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExamQuestionService } from 'src/app/services/examQuestion.service';

@Component({
  selector: 'app-exam-question-view',
  templateUrl: './exam-question-view.component.html',
  styleUrls: ['./exam-question-view.component.css'],
})
export class ExamQuestionViewComponent implements OnInit {
  postForm!: FormGroup;
  examId!: string;
  questionId!: number;
  categoryId!: number;

  constructor(
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
      examId: new FormControl(null),
      sectionId: new FormControl(null),
      examQuestionId: new FormControl(null),
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
}
