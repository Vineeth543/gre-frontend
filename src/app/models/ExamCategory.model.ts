export interface ExamCategoryInterface {
  sectionId?: number;
  examId?: string;
  numberOfQuestions: number;
  typeOfQuestion: string;
  durationInMinutes: number;
  positiveMark: number;
  negativeMark: number;
}
