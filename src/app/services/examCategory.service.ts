import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamCategoryInterface } from '../models/ExamCategory.model';

@Injectable({
  providedIn: 'root',
})
export class ExamCategoryService {
  private baseUrl = 'http://ws-21289:8082';

  constructor(private http: HttpClient) {}

  getExamCategories(examId: string): Observable<ExamCategoryInterface[]> {
    return this.http.get<ExamCategoryInterface[]>(
      this.baseUrl + `/exam/${examId}/categories`
    );
  }

  getExamCategoryById(
    examId: string,
    categoryId: string
  ): Observable<ExamCategoryInterface> {
    return this.http.get<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`
    );
  }

  createExamCategory(
    examId: string,
    category: ExamCategoryInterface
  ): Observable<ExamCategoryInterface> {
    return this.http.post<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories`,
      category
    );
  }

  updateExamCategory(
    examId: string,
    categoryId: string,
    category: ExamCategoryInterface
  ): Observable<ExamCategoryInterface> {
    return this.http.put<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`,
      category
    );
  }

  deleteExamCategory(
    examId: string,
    categoryId: string
  ): Observable<ExamCategoryInterface> {
    return this.http.delete<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`
    );
  }
}
