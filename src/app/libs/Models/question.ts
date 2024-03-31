export class Question {
  questionText?: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  correctAnswer?: string;
  rewarded?: boolean;
  difficulty?: string;
  threshold?: number;
  rewardTokens?: number;
  category?: Category;
}

export class Category {
  name?: string;
}
