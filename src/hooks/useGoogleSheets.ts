import { useState, useEffect } from 'react';

export interface SheetData {
  id: string;
  date: string;
  quantity: number;
  value: number;
  city: string;
  state: string;
  total: number;
}

export const useGoogleSheets = (spreadsheetId: string) => {
  const [data, setData] = useState<SheetData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulação dos dados baseados na planilha
        // Em produção, você precisaria usar a Google Sheets API
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
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados da planilha');
        console.error('Erro:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [spreadsheetId]);

  return { data, isLoading, error };
};