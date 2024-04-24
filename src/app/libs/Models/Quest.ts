export class Quest {
  id!: number;
  answer?: string;
  questionText?: string;
  questRewardTokens?: number;
  rewarded?: boolean;
  difficulty?: string;
  threshold?: number;
  rewardTokens?: number;
}
