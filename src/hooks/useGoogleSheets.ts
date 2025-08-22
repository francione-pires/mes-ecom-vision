import { useState, useEffect } from 'react';

interface SheetData {
  [key: string]: string | number;
}

export const useGoogleSheets = (spreadsheetId: string) => {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'AIzaSyDzRq_Zus16qh45tH00FTTkpw7hiiRQ1oU';

  const fetchSheetData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados da primeira aba da planilha
      const range = 'A:Z'; // Pega todas as colunas da planilha
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da planilha');
      }

      const result = await response.json();
      const values = result.values || [];

      if (values.length === 0) {
        setData([]);
        return;
      }

      // Primeira linha como cabeçalhos
      const headers = values[0];
      
      // Converter linhas em objetos
      const rows = values.slice(1).map((row: string[]) => {
        const obj: SheetData = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });

      setData(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, [spreadsheetId]);

  const refresh = () => {
    fetchSheetData();
  };

  return { data, loading, error, refresh };
};