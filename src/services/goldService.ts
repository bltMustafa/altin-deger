import { getGoldPrices, getExchangeRates } from '../utils/api';

export interface GoldRate {
  name: string;
  buying: string;
  selling: string;
  change_rate: string;
  type: string;
  update_date: string;
  market_status: string;
  original_buying?: string;
  original_selling?: string;
}

export const fetchGoldRates = async (): Promise<GoldRate[]> => {
  try {
    return await getGoldPrices();
  } catch (error) {
    console.error('Altın fiyatları alınırken hata:', error);
    throw error;
  }
};

export const fetchExchangeRates = async (): Promise<GoldRate[]> => {
  try {
    return await getExchangeRates();
  } catch (error) {
    console.error('Döviz kurları çekilemedi:', error);
    throw error;
  }
}; 