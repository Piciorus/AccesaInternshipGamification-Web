export class Quest {
  id!: number;
  answer?: string;
  description?: string;
  questRewardTokens?: number;
  rewarded?: boolean;
  difficulty?: string;
  threshold?: number;
  rewardTokens?: number;
}
