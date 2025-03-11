export interface GoldPrice {
  type: string;
  buying: number;
  selling: number;
  lastUpdate: string;
  change: number;
}

export interface GoldData {
  gram: GoldPrice;
  ceyrek: GoldPrice;
  yarim: GoldPrice;
  tam: GoldPrice;
  cumhuriyet: GoldPrice;
  ata: GoldPrice;
  resat: GoldPrice;
  hamit: GoldPrice;
} 