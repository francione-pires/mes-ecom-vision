import React from 'react';
import { useGoogleSheets, SheetData } from '@/hooks/useGoogleSheets';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SheetsDataTableProps {
  spreadsheetId: string;
}

export const SheetsDataTable: React.FC<SheetsDataTableProps> = ({ spreadsheetId }) => {
  const { data, isLoading, error } = useGoogleSheets(spreadsheetId);
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());

  const handleRefresh = () => {
    window.location.reload(); // Força o reload para buscar dados atualizados
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-warning flex items-center gap-2">
            ⚠️ Configuração Necessária
          </CardTitle>
          <CardDescription>
            Para conectar à planilha real, você precisa configurar uma API key do Google Cloud Console.
            <br />
            <strong>Passos:</strong>
            <br />
            1. Acesse <a href="https://console.cloud.google.com/" target="_blank" className="text-primary underline">Google Cloud Console</a>
            <br />
            2. Habilite a Google Sheets API
            <br />
            3. Crie uma API key e substitua no arquivo <code>src/hooks/useGoogleSheets.ts</code>
            <br />
            <em>Atualmente exibindo dados de demonstração.</em>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Dados da Planilha do Google Sheets</CardTitle>
            <CardDescription>
              Dados atualizados automaticamente da planilha • Última atualização: {lastUpdate.toLocaleTimeString()}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Valor Unit.</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>R$ {item.value.toFixed(2)}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {item.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        {!isLoading && data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum dado encontrado na planilha.
          </div>
        )}
      </CardContent>
    </Card>
  );
};