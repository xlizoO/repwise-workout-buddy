import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

const StatsCard = ({ title, value, change, changeType = "neutral", icon }: StatsCardProps) => {
  const changeColors = {
    positive: "text-fitness-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="bg-fitness-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <span className="text-lg">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        {change && (
          <p className={cn("text-xs", changeColors[changeType])}>
            {changeType === "positive" && "+"}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;