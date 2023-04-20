export interface ExamQuestionInterface {
  examId?: string;
  sectionId?: number;
  examQuestionId?: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
}
