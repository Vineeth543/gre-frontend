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

  getExamQuestionsByExamAndCaregoryId(
    examId: string,
    sectionId: number
  ): Observable<ExamQuestionInterface[]> {
    return this.http.get<ExamQuestionInterface[]>(
      this.baseUrl + `/exam/${examId}/section/${sectionId}/questions`
    );
  }

  getExamQuestionByQuestionId(
    examId: string,
    sectionId: number,
    questionId: number
  ): Observable<ExamQuestionInterface> {
    return this.http.get<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`
    );
  }

  addExamQuestion(
    examId: string,
    sectionId: number,
    question: ExamQuestionInterface
  ): Observable<ExamQuestionInterface> {
    return this.http.post<ExamQuestionInterface>(
      this.baseUrl + `/exam/${examId}/section/${sectionId}/questions`,
      question
    );
  }

  updateExamQuestion(
    examId: string,
    sectionId: number,
    questionId: number,
    question: ExamQuestionInterface
  ): Observable<ExamQuestionInterface> {
    question.examId = examId;
    question.sectionId = sectionId;
    question.examQuestionId = questionId;
    return this.http.put<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`,
      question
    );
  }

  deleteExamQuestion(
    examId: string,
    sectionId: number,
    questionId: number
  ): Observable<ExamQuestionInterface> {
    return this.http.delete<ExamQuestionInterface>(
      this.baseUrl +
        `/exam/${examId}/section/${sectionId}/questions/${questionId}`
    );
  }

  getAllExamQuestionsFromLocalStorage(): ExamQuestionInterface[] {
    return JSON.parse(localStorage.getItem('exam-questions')!) || [];
  }

  getExamQuestionsByExamAndCaregoryIdFromLocalStorage(
    examId: string,
    categoryId: number
  ): ExamQuestionInterface[] {
    const questions = this.getAllExamQuestionsFromLocalStorage();
    return questions.filter(
      (question) =>
        question.examId === examId && question.sectionId === categoryId
    );
  }

  getExamQuestionByQuestionIdFromLocalStorage(
    examId: string,
    sectionId: number,
    questionId: number
  ): ExamQuestionInterface {
    const questions = this.getAllExamQuestionsFromLocalStorage();
    return questions.find(
      (question) =>
        question.examId === examId &&
        question.sectionId === sectionId &&
        question.examQuestionId === questionId
    )!;
  }

  addExamQuestionToLocalStorage(
    examId: string,
    categoryId: number,
    question: ExamQuestionInterface
  ): void {
    const questions = this.getAllExamQuestionsFromLocalStorage();
    question.examId = examId;
    question.sectionId = categoryId;
    questions.push(question);
    localStorage.setItem('exam-questions', JSON.stringify(questions));
    alert('Question added successfully to local storage');
  }

  updateExamQuestionInLocalStorage(
    examId: string,
    categoryId: number,
    questionId: number,
    question: ExamQuestionInterface
  ) {
    const questions = this.getAllExamQuestionsFromLocalStorage();
    const index = questions.findIndex(
      (question) =>
        question.examId === examId &&
        question.sectionId === categoryId &&
        question.examQuestionId === questionId
    );
    question.examId = examId;
    question.sectionId = categoryId;
    question.examQuestionId = questionId;
    questions[index] = question;
    localStorage.setItem('exam-questions', JSON.stringify(questions));
    alert('Question updated successfully in local storage');
  }

  deleteExamQuestionFromLocalStorage(
    examId: string,
    sectionId: number,
    questionId: number
  ) {
    const questions = this.getAllExamQuestionsFromLocalStorage();
    const index = questions.findIndex(
      (question) =>
        question.examId === examId &&
        question.sectionId === sectionId &&
        question.examQuestionId === questionId
    );
    questions.splice(index, 1);
    let newQuestionId = 1;
    questions.forEach((question: ExamQuestionInterface) => {
      question.examId === examId &&
        question.sectionId === sectionId &&
        (question.examQuestionId = newQuestionId++);
    });
    localStorage.setItem('exam-questions', JSON.stringify(questions));
    alert('Question deleted successfully from local storage');
  }
}
