export interface TestHistory {
  testDate: string;
  chatGptCorrectAnswers: number;
  userCorrectAnswers: number;
  questionsAnswered: number;
  category: Category;
}

export interface Category {
  name: string;
}
