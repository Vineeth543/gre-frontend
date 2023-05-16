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

  getAllExamCategories(): Observable<ExamCategoryInterface[]> {
    return this.http.get<ExamCategoryInterface[]>(this.baseUrl + '/exam');
  }

  getExamCategoriesByExamId(
    examId: string
  ): Observable<ExamCategoryInterface[]> {
    return this.http.get<ExamCategoryInterface[]>(
      this.baseUrl + `/exam/${examId}/categories`
    );
  }

  getExamCategoryById(
    examId: string,
    categoryId: number
  ): Observable<ExamCategoryInterface> {
    return this.http.get<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`
    );
  }

  createExamCategory(
    category: ExamCategoryInterface
  ): Observable<ExamCategoryInterface> {
    return this.http.post<ExamCategoryInterface>(
      this.baseUrl + `/exam/categories`,
      category
    );
  }

  updateExamCategory(
    examId: string,
    categoryId: number,
    category: ExamCategoryInterface
  ): Observable<ExamCategoryInterface> {
    category.examId = examId;
    category.sectionId = categoryId;
    return this.http.put<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`,
      category
    );
  }

  deleteExamCategory(
    examId: string,
    categoryId: number
  ): Observable<ExamCategoryInterface> {
    return this.http.delete<ExamCategoryInterface>(
      this.baseUrl + `/exam/${examId}/categories/${categoryId}`
    );
  }

  getExamCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('exam-category') || '[]');
  }

  getExamCategoriesByExamIdFromLocalStorage(examId: string) {
    let examCategories = JSON.parse(localStorage.getItem('exam-category')!);
    return examCategories.filter(
      (category: ExamCategoryInterface) => category.examId === examId
    );
  }

  getExamCategoryByIdFromLocalStorage(examId: string, categoryId: number) {
    let examCategories = JSON.parse(localStorage.getItem('exam-category')!);
    return examCategories.find(
      (category: ExamCategoryInterface) =>
        category.examId === examId && category.sectionId === categoryId
    );
  }

  addExamCategoryToLocalStorage(category: ExamCategoryInterface) {
    let examCategories = JSON.parse(
      localStorage.getItem('exam-category') || '[]'
    );
    examCategories.push(category);
    localStorage.setItem('exam-category', JSON.stringify(examCategories));
    alert('Exam category created in local storage!');
  }

  updateExamCategoryInLocalStorage(
    examId: string,
    categoryId: number,
    category: ExamCategoryInterface
  ) {
    let examCategories = JSON.parse(localStorage.getItem('exam-category')!);
    let index = examCategories.findIndex(
      (category: ExamCategoryInterface) =>
        category.examId === examId && category.sectionId === categoryId
    );
    category.examId = examId;
    category.sectionId = categoryId;
    examCategories[index] = category;
    localStorage.setItem('exam-category', JSON.stringify(examCategories));
    alert('Exam category updated in local storage!');
  }

  deleteExamCategoryFromLocalStorage(examId: string, categoryId: number) {
    let examCategories = JSON.parse(localStorage.getItem('exam-category')!);
    let index = examCategories.findIndex(
      (category: ExamCategoryInterface) =>
        category.examId === examId && category.sectionId === categoryId
    );
    examCategories.splice(index, 1);
    let newSectionId = 1;
    examCategories.forEach((category: ExamCategoryInterface) => {
      category.examId === examId && (category.sectionId = newSectionId++);
    });
    localStorage.setItem('exam-category', JSON.stringify(examCategories));
    alert('Exam category deleted from local storage!');
  }
}
