import axios from 'axios';
import { ExchangeRates } from '../types';

const API_KEY = 'ebdf0af3d66cb5038685c851ea468c68';
const BASE_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

export const getExchangeRates = async (): Promise<ExchangeRates | null> => {
  try {
    const response = await axios.get<ExchangeRates>(BASE_URL);
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar taxas de câmbio:', error);
    return null;

  }
};