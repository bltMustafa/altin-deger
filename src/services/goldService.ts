import axios from 'axios';

export interface GoldRate {
  name: string;
  buying: string;
  selling: string;
  change_rate: string;
  type: string;
  update_date: string;
  market_status: string;
}

const API_URL = 'http://localhost:3000/api/gold-prices';

export const fetchGoldRates = async (): Promise<GoldRate[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data
      .filter((item: any) => item.buying && item.selling) // Sadece alış-satış fiyatı olan kalemleri al
      .map((item: any) => ({
        name: item.name,
        buying: item.buying,
        selling: item.selling,
        change_rate: item.change_rate || "0",
        type: item.type,
        update_date: item.update_date,
        market_status: item.market_status
      }));
  } catch (error) {
    console.error('Altın fiyatları alınırken hata:', error);
    throw error;
  }
};

export async function fetchExchangeRates(): Promise<GoldRate[]> {
  try {
    const response = await fetch('http://localhost:3000/api/exchange-rates');
    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }
    return await response.json();
  } catch (error) {
    console.error('Döviz kurları çekilemedi:', error);
    throw error;
  }
} 