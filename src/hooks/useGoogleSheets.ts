import { useState, useEffect } from 'react';
import { google } from 'googleapis';

export interface SheetData {
  id: string;
  date: string;
  quantity: number;
  value: number;
  city: string;
  state: string;
  total: number;
}

// Para usar sua própria API key, substitua por uma chave válida do Google Cloud Console
const GOOGLE_API_KEY = 'AIzaSyBvONWJQ0g8fF4W4nKrpI7J5QFjL8vXnYk'; // Substitua pela sua API key

export const useGoogleSheets = (spreadsheetId: string) => {
  const [data, setData] = useState<SheetData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const sheets = google.sheets({
          version: 'v4',
          auth: GOOGLE_API_KEY
        });

        // Buscar dados da primeira aba (assumindo que os dados estão na aba "E-commerce")
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: 'E-commerce!A:H', // Ajuste o range conforme sua planilha
        });

        const values = response.data.values;
        
        if (!values || values.length < 2) {
          setData([]);
          return;
        }

        // Pular o cabeçalho (primeira linha)
        const dataRows = values.slice(1);
        
        const sheetData: SheetData[] = dataRows.map((row, index) => ({
          id: row[1] || `${index + 1}`, // Coluna B (ID)
          date: row[0] || '', // Coluna A (Data)
          quantity: parseInt(row[2]) || 0, // Coluna C (Quantidade)
          value: parseFloat(row[4]) || 0, // Coluna E (Valor)
          city: row[6] || '', // Coluna G (Cidade)
          state: row[7] || '', // Coluna H (Estado)
          total: parseFloat(row[8]) || 0 // Coluna I (Total)
        })).filter(item => item.id && item.date); // Filtrar linhas vazias
        
        setData(sheetData);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao buscar dados da planilha:', err);
        
        // Se houver erro na API, usar dados mock para demonstração
        const mockData: SheetData[] = [
          {
            id: '18991',
            date: '02/06/2025',
            quantity: 2,
            value: 16.75,
            city: 'São Luís',
            state: 'MA',
            total: 180.00
          },
          {
            id: '18992',
            date: '02/06/2025',
            quantity: 1,
            value: 11.65,
            city: 'Porto Alegre',
            state: 'RS',
            total: 60.00
          },
          {
            id: '19962',
            date: '05/08/2025',
            quantity: 2,
            value: 28.50,
            city: 'São José dos Campos',
            state: 'SP',
            total: 120.00
          },
          {
            id: '19819',
            date: '25/07/2025',
            quantity: 1,
            value: 22.00,
            city: 'Recife',
            state: 'PE',
            total: 150.00
          },
          {
            id: '19850',
            date: '28/07/2025',
            quantity: 2,
            value: 18.90,
            city: 'Niterói',
            state: 'RJ',
            total: 45.00
          },
          {
            id: '19900',
            date: '30/07/2025',
            quantity: 14,
            value: 160.10,
            city: 'São Paulo',
            state: 'SP',
            total: 180.00
          },
          {
            id: '20042',
            date: '18/08/2025',
            quantity: 1,
            value: 8.60,
            city: 'Maceió',
            state: 'AL',
            total: 73.00
          }
        ];
        
        setData(mockData);
        setError('Usando dados de demonstração. Configure sua API key do Google para conectar à planilha real.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [spreadsheetId]);

  return { data, isLoading, error };
};