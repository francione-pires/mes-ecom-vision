import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCartIcon, PackageIcon, TruckIcon, RotateCcwIcon, UsersIcon, BookOpenIcon, DollarSignIcon } from "lucide-react";

export const Dashboard = () => {
  // Dados do e-commerce
  const ecommerceData = {
    orders: { current: 282, previous: 149 },
    totalSales: { current: "35.966,56", previous: "21.871,84" },
    averageTicket: { current: "123,00", previous: "136,00" },
    averageShipping: { current: "28,00", previous: "31,00" },
    returns: { current: 4, previous: 0 }
  };

  // Dados dos parceiros
  const partnersData = {
    registeredPartners: { current: 41, previous: 37 },
    booksSent: { current: 55, previous: 43 },
    totalInvested: { current: "1.360,45", previous: "870,21" }
  };

  // Produtos mais vendidos
  const topProducts = {
    current: "Liderança e Sabotagem Emocional Permanecendo Fiel no Ministério Ore Grande",
    previous: "Dom Resmunglote Paternidade em Crise Breve Catecismo"
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Relatório Mensal E-Commerce
        </h1>
        <p className="text-muted-foreground text-lg">
          Análise comparativa: Mês Atual vs Mês Anterior
        </p>
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
              <p className="text-sm leading-relaxed">{topProducts.current}</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-info text-info-foreground">
              <CardTitle className="text-lg">Mês Anterior</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed">{topProducts.previous}</p>
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