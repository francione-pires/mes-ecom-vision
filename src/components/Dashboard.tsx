import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, PackageIcon, TruckIcon, RotateCcwIcon, UsersIcon, BookOpenIcon, DollarSignIcon, RefreshCwIcon } from "lucide-react";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const { toast } = useToast();
  const { data: sheetData, loading, error, refresh } = useGoogleSheets('1FFE-lbtKTKpqb0bTwhPYnr4-6vqg8SK1r5cYksAyyKE');

  // Função para extrair dados da planilha
  const getMetricFromSheet = (metricName: string, period: 'atual' | 'anterior' = 'atual') => {
    const row = sheetData.find(row => 
      row['Métrica']?.toString().toLowerCase().includes(metricName.toLowerCase())
    );
    
    if (!row) return 0;
    
    const value = period === 'atual' ? row['Mês Atual'] : row['Mês Anterior'];
    return value || 0;
  };

  // Dados do e-commerce com fallback para valores estáticos
  const ecommerceData = {
    orders: { 
      current: loading ? 282 : getMetricFromSheet('pedidos', 'atual') || 282, 
      previous: loading ? 149 : getMetricFromSheet('pedidos', 'anterior') || 149 
    },
    totalSales: { 
      current: loading ? "35.966,56" : getMetricFromSheet('vendas', 'atual') || "35.966,56", 
      previous: loading ? "21.871,84" : getMetricFromSheet('vendas', 'anterior') || "21.871,84" 
    },
    averageTicket: { 
      current: loading ? "123,00" : getMetricFromSheet('ticket', 'atual') || "123,00", 
      previous: loading ? "136,00" : getMetricFromSheet('ticket', 'anterior') || "136,00" 
    },
    averageShipping: { 
      current: loading ? "28,00" : getMetricFromSheet('frete', 'atual') || "28,00", 
      previous: loading ? "31,00" : getMetricFromSheet('frete', 'anterior') || "31,00" 
    },
    returns: { 
      current: loading ? 4 : getMetricFromSheet('devolucao', 'atual') || 4, 
      previous: loading ? 0 : getMetricFromSheet('devolucao', 'anterior') || 0 
    }
  };

  // Dados dos parceiros com fallback para valores estáticos
  const partnersData = {
    registeredPartners: { 
      current: loading ? 41 : getMetricFromSheet('parceiros', 'atual') || 41, 
      previous: loading ? 37 : getMetricFromSheet('parceiros', 'anterior') || 37 
    },
    booksSent: { 
      current: loading ? 55 : getMetricFromSheet('livros', 'atual') || 55, 
      previous: loading ? 43 : getMetricFromSheet('livros', 'anterior') || 43 
    },
    totalInvested: { 
      current: loading ? "1.360,45" : getMetricFromSheet('investido', 'atual') || "1.360,45", 
      previous: loading ? "870,21" : getMetricFromSheet('investido', 'anterior') || "870,21" 
    }
  };

  const handleRefresh = async () => {
    try {
      await refresh();
      toast({
        title: "Dados atualizados",
        description: "Os dados da planilha foram atualizados com sucesso!",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar os dados da planilha.",
        variant: "destructive",
      });
    }
  };

  // Produtos mais vendidos
  const topProducts = {
    current: [
      "Liderança e Sabotagem Emocional",
      "Permanecendo Fiel no Ministério", 
      "Ore Grande"
    ],
    previous: [
      "Dom Resmungalote",
      "Paternidade em Crise",
      "Breve Catecismo"
    ]
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Relatório Mensal E-Commerce
        </h1>
        <p className="text-muted-foreground text-lg">
          Análise comparativa: Mês Atual vs Mês Anterior
        </p>
        
        {/* Botão de atualizar dados */}
        <div className="flex justify-center">
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCwIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Atualizando...' : 'Atualizar Dados'}
          </Button>
        </div>

        {error && (
          <div className="text-destructive text-sm">
            Erro ao carregar dados: {error}
          </div>
        )}
      </div>

      {/* E-commerce Metrics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-primary" />
          E-commerce
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <MetricCard
            title="Pedidos"
            currentValue={ecommerceData.orders.current}
            previousValue={ecommerceData.orders.previous}
            icon={<PackageIcon className="h-4 w-4" />}
            variant="success"
          />
          <MetricCard
            title="Total em Vendas"
            currentValue={ecommerceData.totalSales.current}
            previousValue={ecommerceData.totalSales.previous}
            type="currency"
            icon={<DollarSignIcon className="h-4 w-4" />}
            variant="success"
          />
          <MetricCard
            title="Ticket Médio"
            currentValue={ecommerceData.averageTicket.current}
            previousValue={ecommerceData.averageTicket.previous}
            type="currency"
            icon={<ShoppingCartIcon className="h-4 w-4" />}
            variant="warning"
          />
          <MetricCard
            title="Frete Médio"
            currentValue={ecommerceData.averageShipping.current}
            previousValue={ecommerceData.averageShipping.previous}
            type="currency"
            icon={<TruckIcon className="h-4 w-4" />}
            variant="info"
          />
          <MetricCard
            title="Devoluções"
            currentValue={ecommerceData.returns.current}
            previousValue={ecommerceData.returns.previous}
            icon={<RotateCcwIcon className="h-4 w-4" />}
            variant="warning"
          />
        </div>
      </div>

      {/* Partners Metrics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-primary" />
          Envios Parceiros
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Parceiros Cadastrados"
            currentValue={partnersData.registeredPartners.current}
            previousValue={partnersData.registeredPartners.previous}
            icon={<UsersIcon className="h-4 w-4" />}
            variant="info"
          />
          <MetricCard
            title="Livros Enviados"
            currentValue={partnersData.booksSent.current}
            previousValue={partnersData.booksSent.previous}
            icon={<BookOpenIcon className="h-4 w-4" />}
            variant="success"
          />
          <MetricCard
            title="Total Investido"
            currentValue={partnersData.totalInvested.current}
            previousValue={partnersData.totalInvested.previous}
            type="currency"
            icon={<DollarSignIcon className="h-4 w-4" />}
            variant="success"
          />
        </div>
      </div>

      {/* Top Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpenIcon className="h-6 w-6 text-primary" />
          Mais Vendidos
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-success text-success-foreground">
              <CardTitle className="text-lg">Mês Atual</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {topProducts.current.map((book, index) => (
                  <li key={index} className="text-sm leading-relaxed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-current rounded-full flex-shrink-0"></span>
                    {book}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-info text-info-foreground">
              <CardTitle className="text-lg">Mês Anterior</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {topProducts.previous.map((book, index) => (
                  <li key={index} className="text-sm leading-relaxed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-current rounded-full flex-shrink-0"></span>
                    {book}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Resumo do Período</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold">89,3%</div>
                <div className="text-sm opacity-90">↗ Aumento em Pedidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold">64,6%</div>
                <div className="text-sm opacity-90">↗ Crescimento em Vendas</div>
              </div>
              <div>
                <div className="text-3xl font-bold">56,3%</div>
                <div className="text-sm opacity-90">↗ Aumento Investimento</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};