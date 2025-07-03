import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { Camera as CapacitorCamera, CameraResultType } from "@capacitor/camera";
import { useToast } from "@/hooks/use-toast";
import gymBackground from "@/assets/gym-background.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleEquipmentScan = async () => {
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      
      toast({
        title: "设备识别中...",
        description: "正在分析健身器材，请稍候",
      });
      
      // 模拟识别过程
      setTimeout(() => {
        toast({
          title: "识别成功！",
          description: "检测到杠铃卧推架，正在跳转到教学页面",
        });
        // 这里可以跳转到具体的器材教学页面
        // navigate('/equipment/bench-press');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "拍照失败",
        description: "请检查相机权限或重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section with Character */}
      <div className="relative h-80 mb-6 overflow-hidden">
        <img 
          src={gymBackground} 
          alt="Gym Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/10" />
        
        {/* Character Image */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 bg-primary/10">
            <img 
              src="/lovable-uploads/6dd81985-72fa-4c16-bb7b-d8cdb12c8f76.png" 
              alt="AI Coach Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            RepMate
          </h1>
          <p className="text-muted-foreground">
            你的专属健身搭子
          </p>
        </div>
      </div>

      <div className="space-y-6 px-4">
        {/* AI Coach Module */}
        <Card 
          className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 cursor-pointer hover:from-primary/30 hover:to-primary/20 transition-all duration-300"
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

        {/* Equipment Recognition */}
        <Card 
          className="bg-gradient-to-r from-secondary/20 to-secondary/10 border-secondary/30 cursor-pointer hover:from-secondary/30 hover:to-secondary/20 transition-all duration-300"
          onClick={handleEquipmentScan}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-2">器材识别</h2>
                <p className="text-muted-foreground">
                  拍照识别健身器材，获取使用教程
                </p>
                <p className="text-sm text-secondary-foreground font-medium mt-1">
                  点击拍照识别 📸
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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