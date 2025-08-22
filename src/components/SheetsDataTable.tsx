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

interface SheetsDataTableProps {
  spreadsheetId: string;
}

export const SheetsDataTable: React.FC<SheetsDataTableProps> = ({ spreadsheetId }) => {
  const { data, isLoading, error } = useGoogleSheets(spreadsheetId);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Erro</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados da Planilha</CardTitle>
        <CardDescription>
          Informações extraídas da planilha do Google Sheets
        </CardDescription>
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