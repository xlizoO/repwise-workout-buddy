import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTrainingDialog, setShowTrainingDialog] = useState(false);
  
  const todayWorkout = {
    id: "chest-shoulders-today",
    title: "胸部 + 三角肌训练",
    exercises: [
      { name: "杠铃卧推", sets: 4, reps: "8-10", weight: 80 },
      { name: "哑铃飞鸟", sets: 3, reps: "12-15", weight: 15 },
      { name: "肩部推举", sets: 4, reps: "10-12", weight: 25 },
      { name: "侧平举", sets: 3, reps: "15-20", weight: 8 },
    ],
    duration: "45-60分钟"
  };

  const handleAICoachClick = () => {
    setShowTrainingDialog(true);
  };

  const handleStartFirstExercise = () => {
    setShowTrainingDialog(false);
    navigate(`/workout/${todayWorkout.id}`);
  };

  return (
    <div className="pb-20 px-4">
      {/* AI Coach Banner */}
      <Card 
        className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 mb-6 cursor-pointer hover:from-primary/30 hover:to-primary/20 transition-all duration-300"
        onClick={handleAICoachClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
              🤖
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">AI 虚拟教练</h2>
              <p className="text-muted-foreground">
                今日推荐：{todayWorkout.title}
              </p>
              <p className="text-sm text-primary font-medium mt-1">
                点击开始今日训练 →
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Dialog */}
      <Dialog open={showTrainingDialog} onOpenChange={setShowTrainingDialog}>
        <DialogContent className="bg-fitness-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">🤖 AI教练推荐</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                今日训练：{todayWorkout.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                预计时间：{todayWorkout.duration}
              </p>
            </div>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-2">
                  第一个项目：{todayWorkout.exercises[0].name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {todayWorkout.exercises[0].sets}组 x {todayWorkout.exercises[0].reps} @ {todayWorkout.exercises[0].weight}kg
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowTrainingDialog(false)}
                className="flex-1"
              >
                稍后训练
              </Button>
              <Button 
                onClick={handleStartFirstExercise}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                开始训练
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;