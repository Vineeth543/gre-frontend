import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamScheduleInterface } from '../models/ExamSchedule.model';

@Injectable({
  providedIn: 'root',
})
export class ExamSceduleService {
  private baseUrl = 'http://ws-21289:8082';

  constructor(private http: HttpClient) {}

  getExams(): Observable<ExamScheduleInterface[]> {
    return this.http.get<ExamScheduleInterface[]>(this.baseUrl + `/exams`);
  }

  getExamById(id: string): Observable<ExamScheduleInterface> {
    return this.http.get<ExamScheduleInterface>(this.baseUrl + `/exams/${id}`);
  }

  createExam(exam: ExamScheduleInterface): Observable<ExamScheduleInterface> {
    return this.http.post<ExamScheduleInterface>(this.baseUrl + `/exams`, exam);
  }

  updateExam(
    id: string,
    exam: ExamScheduleInterface
  ): Observable<ExamScheduleInterface> {
    return this.http.put<ExamScheduleInterface>(
      this.baseUrl + `/exams/${id}`,
      exam
    );
  }

  deleteExam(id: string): Observable<ExamScheduleInterface> {
    return this.http.delete<ExamScheduleInterface>(
      this.baseUrl + `/exams/${id}`
    );
  }

  getExamsFromLocalStorage(): ExamScheduleInterface[] {
    return JSON.parse(localStorage.getItem('exam-schedule') || '[]');
  }

  getExamByIdFromLocalStorage(id: string): ExamScheduleInterface {
    let exams = JSON.parse(localStorage.getItem('exam-schedule') || '[]');
    return exams.find((exam: ExamScheduleInterface) => exam.examId === id);
  }

  createExamInLocalStorage(exam: ExamScheduleInterface) {
    let exams = JSON.parse(localStorage.getItem('exam-schedule') || '[]');
    exam.examId = Math.random().toString(36).substr(2, 9);
    exams.push(exam);
    localStorage.setItem('exam-schedule', JSON.stringify(exams));
    alert('Exam created in local storage!');
  }

  updateExamInLocalStorage(id: string, exam: ExamScheduleInterface) {
    let exams = JSON.parse(localStorage.getItem('exam-schedule')!);
    let index = exams.findIndex(
      (exam: ExamScheduleInterface) => exam.examId === id
    );
    exam.examId = id;
    exams[index] = exam;
    localStorage.setItem('exam-schedule', JSON.stringify(exams));
    alert('Exam updated in local storage!');
  }

  deleteExamFromLocalStorage(id: string) {
    let exams = JSON.parse(localStorage.getItem('exam-schedule')!);
    let index = exams.findIndex(
      (exam: ExamScheduleInterface) => exam.examId === id
    );
    exams.splice(index, 1);
    localStorage.setItem('exam-schedule', JSON.stringify(exams));
    alert('Exam deleted from local storage!');
  }
}
