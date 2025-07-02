import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  completed?: boolean;
}

interface WorkoutCardProps {
  title: string;
  exercises: Exercise[];
  duration?: string;
  difficulty?: "初级" | "中级" | "高级";
  onStart?: () => void;
}

const WorkoutCard = ({ title, exercises, duration, difficulty, onStart }: WorkoutCardProps) => {
  const difficultyColors = {
    "初级": "bg-fitness-success",
    "中级": "bg-fitness-warning", 
    "高级": "bg-destructive"
  };

  return (
    <Card className="bg-fitness-card hover:bg-secondary/50 transition-colors border-border">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {difficulty && (
            <Badge variant="secondary" className={cn("text-xs", difficultyColors[difficulty])}>
              {difficulty}
            </Badge>
          )}
        </div>
        {duration && (
          <div className="text-sm text-muted-foreground">预计时间: {duration}</div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {exercises.slice(0, 3).map((exercise, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{exercise.name}</span>
              <span className="text-muted-foreground">
                {exercise.sets}组 x {exercise.reps}
                {exercise.weight && ` @ ${exercise.weight}kg`}
              </span>
            </div>
          ))}
          {exercises.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{exercises.length - 3} 个动作
            </div>
          )}
        </div>
        
        <Button 
          onClick={onStart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          开始训练
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;