import axios from 'axios';

// Veri tipleri
interface ExchangeRate {
  Alış: string;
  Satış: string;
  Değişim: string;
  Tür: string;
}

interface GoldPrice {
  Alış: string;
  Satış: string;
  Değişim: string;
  Tür: string;
}

interface ApiResponse {
  Update_Date: string;
  [key: string]: ExchangeRate | GoldPrice | string;
}

interface CacheData {
  goldPrices: ApiResponse | null;
  exchangeRates: ApiResponse | null;
  lastFetch: number | null;
}

// Cache mekanizması
let cachedData: CacheData = {
  goldPrices: null,
  exchangeRates: null,
  lastFetch: null
};

const CACHE_DURATION = 2 * 60 * 1000; // 2 dakika

// Piyasa durumunu kontrol et
export function isMarketOpen(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const day = now.getDay();
  
  // Hafta sonu kontrolü (0 = Pazar, 6 = Cumartesi)
  if (day === 0 || day === 6) return false;
  
  // Saat kontrolü (09:00 - 17:30)
  const currentTime = hour + minutes / 60;
  const isTimeInRange = currentTime >= 9 && currentTime <= 17.5;

  // Cuma günü kontrolü (5 = Cuma)
  if (day === 5) {
    // Cuma günleri 09:00 - 17:30 arası açık
    return isTimeInRange;
  }

  // Diğer iş günleri için kontrol
  return isTimeInRange;
}

// Veriyi cache'den al veya yenile
async function getDataFromCache() {
  const now = Date.now();
  if (!cachedData.lastFetch || (now - cachedData.lastFetch) > CACHE_DURATION) {
    try {
      const response = await axios.get<ApiResponse>('https://finans.truncgil.com/today.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      cachedData = {
        goldPrices: response.data,
        exchangeRates: response.data,
        lastFetch: now
      };
    } catch (error) {
      console.error('API veri çekme hatası:', error);
      if (!cachedData.lastFetch) {
        throw error;
      }
    }
  }
  return cachedData;
}

// Altın fiyatlarını getir
export async function getGoldPrices() {
  try {
    const { goldPrices } = await getDataFromCache();
    
    if (!goldPrices) {
      throw new Error('API verisi alınamadı');
    }

    const goldTypes = {
      "Gram Altın": "gram-altin",
      "Has Altın": "gram-has-altin",
      "Çeyrek Altın": "ceyrek-altin",
      "Yarım Altın": "yarim-altin",
      "Tam Altın": "tam-altin",
      "Cumhuriyet Altını": "cumhuriyet-altini",
      "Ata Altın": "ata-altin",
      "14 Ayar Altın": "14-ayar-altin",
      "18 Ayar Altın": "18-ayar-altin",
      "22 Ayar Bilezik": "22-ayar-bilezik",
      "İkibuçuk Altın": "ikibucuk-altin",
      "Beşli Altın": "besli-altin",
      "Gremse Altın": "gremse-altin",
      "Reşat Altın": "resat-altin",
      "Hamit Altın": "hamit-altin",
      "ONS": "ons",
      "Gümüş": "gumus",
      "Gram Platin": "gram-platin"
    };

    const goldData = Object.entries(goldTypes)
      .filter(([_, key]) => goldPrices[key] && typeof goldPrices[key] === 'object')
      .map(([name, key]) => {
        const data = goldPrices[key] as GoldPrice;
        return {
          name,
          buying: data.Alış?.replace('$', '') || data.Alış,
          selling: data.Satış?.replace('$', '') || data.Satış,
          change_rate: data.Değişim?.replace('%', '') || "0.00",
          type: data.Tür,
          update_date: goldPrices.Update_Date || new Date().toISOString(),
          market_status: isMarketOpen() ? "Açık" : "Kapalı"
        };
      });

    if (goldData.length === 0) {
      throw new Error('Geçerli altın verisi bulunamadı');
    }

    return goldData;
  } catch (error) {
    console.error('Altın API hatası:', error);
    const now = new Date().toISOString();
    const marketStatus = isMarketOpen() ? "Açık" : "Kapalı";
    
    // Mock data
    return [
      {
        name: "Gram Altın",
        buying: "3430.89",
        selling: "3431.21",
        change_rate: "1.06",
        type: "Altın",
        update_date: now,
        market_status: marketStatus
      },
      {
        name: "Çeyrek Altın",
        buying: "5564.61",
        selling: "5690.90",
        change_rate: "0.59",
        type: "Altın",
        update_date: now,
        market_status: marketStatus
      },
      {
        name: "Yarım Altın",
        buying: "11094.44",
        selling: "11381.80",
        change_rate: "0.59",
        type: "Altın",
        update_date: now,
        market_status: marketStatus
      },
      {
        name: "Tam Altın",
        buying: "22258.44",
        selling: "22693.99",
        change_rate: "0.59",
        type: "Altın",
        update_date: now,
        market_status: marketStatus
      }
    ];
  }
}

// Döviz kurlarını getir
export async function getExchangeRates() {
  try {
    const { exchangeRates } = await getDataFromCache();
    
    if (!exchangeRates) {
      throw new Error('API verisi alınamadı');
    }

    const currencyTypes = [
      "USD", "EUR", "GBP", "CHF", "CAD", "RUB", "AED", "AUD", 
      "DKK", "SEK", "NOK", "JPY", "KWD", "ZAR", "BHD", "SAR"
    ];

    const ratesData = currencyTypes
      .filter(code => exchangeRates[code] && typeof exchangeRates[code] === 'object')
      .map(code => {
        const data = exchangeRates[code] as ExchangeRate;
        return {
          name: code,
          buying: data.Alış,
          selling: data.Satış,
          change_rate: data.Değişim?.replace('%', '') || "0.00",
          type: data.Tür,
          update_date: exchangeRates.Update_Date || new Date().toISOString(),
          market_status: isMarketOpen() ? "Açık" : "Kapalı"
        };
      });

    if (ratesData.length === 0) {
      throw new Error('Geçerli döviz verisi bulunamadı');
    }

    return ratesData;
  } catch (error) {
    console.error('Döviz API hatası:', error);
    const now = new Date().toISOString();
    const marketStatus = isMarketOpen() ? "Açık" : "Kapalı";
    
    // Mock data
    return [
      {
        name: "USD",
        buying: "36.5833",
        selling: "36.6066",
        change_rate: "0.12",
        type: "Döviz",
        update_date: now,
        market_status: marketStatus
      },
      {
        name: "EUR",
        buying: "39.9641",
        selling: "39.9980",
        change_rate: "0.90",
        type: "Döviz",
        update_date: now,
        market_status: marketStatus
      },
      {
        name: "GBP",
        buying: "47.4070",
        selling: "47.4470",
        change_rate: "0.68",
        type: "Döviz",
        update_date: now,
        market_status: marketStatus
      }
    ];
  }
} 