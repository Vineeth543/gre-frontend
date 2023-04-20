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
}
