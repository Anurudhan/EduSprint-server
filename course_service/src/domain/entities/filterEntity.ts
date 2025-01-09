import { Level, PricingType } from "./courseEntity";

export interface filterEntity {
    search: string;
    category: string;
    priceType: PricingType | '';
    minPrice: number;
    maxPrice: number;
    level: Level | '';
    minRating: number;
  }
