import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  currentValue: string | number;
  previousValue: string | number;
  type?: 'currency' | 'number' | 'percentage';
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export const MetricCard = ({ 
  title, 
  currentValue, 
  previousValue, 
  type = 'number',
  icon,
  variant = 'default'
}: MetricCardProps) => {
  const formatValue = (value: string | number) => {
    if (type === 'currency') {
      const numValue = typeof value === 'string' ? 
        parseFloat(value.replace(/[R$\s.]/g, '').replace(',', '.')) : value;
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numValue);
    }
    if (type === 'percentage') {
      return `${value}%`;
    }
    return value.toString();
  };

  const getCurrentNum = () => {
    if (typeof currentValue === 'number') return currentValue;
    return parseFloat(currentValue.toString().replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
  };

  const getPreviousNum = () => {
    if (typeof previousValue === 'number') return previousValue;
    return parseFloat(previousValue.toString().replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
  };

  const currentNum = getCurrentNum();
  const previousNum = getPreviousNum();
  const difference = currentNum - previousNum;
  const percentageChange = previousNum !== 0 ? ((difference / previousNum) * 100) : 0;
  const isPositive = difference > 0;

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-success text-success-foreground';
      case 'warning':
        return 'bg-gradient-warning text-warning-foreground';
      case 'info':
        return 'bg-gradient-info text-info-foreground';
      default:
        return 'bg-gradient-primary text-primary-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
      <CardHeader className={`pb-2 ${getVariantClasses()}`}>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{formatValue(currentValue)}</div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              {isPositive ? (
                <ArrowUpIcon className="h-3 w-3 text-success" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-destructive" />
              )}
              <span className={isPositive ? "text-success" : "text-destructive"}>
                {Math.abs(percentageChange).toFixed(1)}%
              </span>
            </div>
            <span className="text-muted-foreground">vs mês anterior</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Anterior: {formatValue(previousValue)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};