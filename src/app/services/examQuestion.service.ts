import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamQuestionInterface } from '../models/ExamQuestion.model';

@Injectable({
  providedIn: 'root',
})
export class ExamQuestionService {
  private baseUrl = 'http://ws-21289:8082';

  constructor(private http: HttpClient) {}

  getExamQuestions(
    examId: string,
    sectionId: string
  ): Observable<ExamQuestionInterface[]> {
    return this.http.get<ExamQuestionInterface[]>(
      this.baseUrl + `/exam/${examId}/section/${sectionId}/questions`
    );
  }

  getExamQuestionById(
    examId: string,
    sectionId: string,
    questionId: string
  ): Observable<ExamQuestionInterface> {
    return this.http.get<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`
    );
  }

  createExamQuestion(
    examId: string,
    sectionId: string,
    question: ExamQuestionInterface
  ): Observable<ExamQuestionInterface> {
    return this.http.post<ExamQuestionInterface>(
      this.baseUrl + `/exam/${examId}/section/${sectionId}/questions`,
      question
    );
  }

  updateExamQuestion(
    examId: string,
    sectionId: string,
    questionId: string,
    question: ExamQuestionInterface
  ): Observable<ExamQuestionInterface> {
    return this.http.put<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`,
      question
    );
  }

  deleteExamQuestion(
    examId: string,
    sectionId: string,
    questionId: string
  ): Observable<ExamQuestionInterface> {
    return this.http.delete<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`
    );
  }
}
