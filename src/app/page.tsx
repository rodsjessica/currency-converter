"use client"

import { useEffect, useState } from 'react';
import { getExchangeRates } from './services/api';
import CurrencyTable from './components/CurrencyTable';
import { CurrencyRow } from './types';
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<CurrencyRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await getExchangeRates();

        if (rates) {
          const formattedData: CurrencyRow[] = Object.keys(rates.rates).map((currency) => ({
            currency,
            value: (rates.rates.BRL / rates.rates[currency]).toFixed(2),
            time: new Date().toLocaleString(),
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cotação de Moedas em BRL</h1>
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : (
          <CurrencyTable data={data} />
        )}
      </div>
    </div>
  );
}