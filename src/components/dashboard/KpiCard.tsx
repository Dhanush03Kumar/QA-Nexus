import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
}

export const KpiCard = ({
  title,
  value,
  trend = ""
}: KpiCardProps) => {
  return (
    <Card className="group p-6 hover:bg-muted/50 transition-colors border border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-medium text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">{title}</h3>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            {trend.includes("+") && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {trend.includes("-") && (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {trend && (
          <p className={trend.startsWith("+") ? "text-xs text-green-500" : "text-xs text-red-500"}>
            {trend}
          </p>
        )}
      </div>
    </Card>
  );
};