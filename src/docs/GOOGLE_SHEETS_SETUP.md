# Configuração do Google Sheets

## Integração Real com Google Sheets API

Para conectar com a planilha real do Google Sheets em produção, siga os passos abaixo:

### 1. Configurar Google Sheets API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a Google Sheets API
4. Crie credenciais (API Key ou Service Account)

### 2. Instalar Dependência

```bash
npm install googleapis
```

### 3. Atualizar useGoogleSheets Hook

Substitua o conteúdo do hook `src/hooks/useGoogleSheets.ts` por:

```typescript
import { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

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
        
        const doc = new GoogleSpreadsheet(spreadsheetId);
        await doc.useApiKey(process.env.VITE_GOOGLE_SHEETS_API_KEY);
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        
        const sheetData: SheetData[] = rows.map(row => ({
          id: row.get('ID'),
          date: row.get('Data'),
          quantity: parseInt(row.get('Quantidade')),
          value: parseFloat(row.get('Valor')),
          city: row.get('Cidade'),
          state: row.get('Estado'),
          total: parseFloat(row.get('Total'))
        }));
        
        setData(sheetData);
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
```

### 4. Configurar Variáveis de Ambiente

Adicione no arquivo `.env.local`:

```
VITE_GOOGLE_SHEETS_API_KEY=sua_api_key_aqui
```

### 5. Estrutura da Planilha

A planilha deve ter as seguintes colunas:
- Data
- ID
- Quantidade
- Valor
- Cidade
- Estado
- Total

### Nota

Atualmente o sistema está usando dados mockados para demonstração. Para usar dados reais, implemente as configurações acima.