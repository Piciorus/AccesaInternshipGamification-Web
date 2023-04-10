import { Badge } from "./Badge";

export class Quest{
    id!: number;
    answer?: string;
    description?: string;
    questRewardTokens?: string;
    rewarded?:boolean;
    difficulty?: string;
    threshold?:number;
}