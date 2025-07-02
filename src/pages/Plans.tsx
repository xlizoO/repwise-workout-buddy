import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Plans = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeklyPlan = {
    1: [
      { day: "周一", name: "胸部 + 三角肌", completed: true, duration: "50分钟" },
      { day: "周二", name: "背部 + 二头肌", completed: true, duration: "55分钟" },
      { day: "周三", name: "休息日", completed: true, duration: "-" },
      { day: "周四", name: "腿部训练", completed: false, duration: "60分钟" },
      { day: "周五", name: "肩部 + 腹肌", completed: false, duration: "45分钟" },
      { day: "周六", name: "有氧训练", completed: false, duration: "30分钟" },
      { day: "周日", name: "休息日", completed: false, duration: "-" },
    ]
  };

  const weekProgress = {
    completed: 2,
    total: 5,
    percentage: Math.round((2 / 5) * 100)
  };

  const templates = [
    {
      name: "初学者计划",
      description: "适合0-6个月训练经验",
      duration: "4周",
      frequency: "3天/周",
      difficulty: "初级"
    },
    {
      name: "增肌训练",
      description: "专注肌肉增长和力量提升",
      duration: "8周", 
      frequency: "5天/周",
      difficulty: "中级"
    },
    {
      name: "减脂塑形",
      description: "高强度燃脂训练",
      duration: "6周",
      frequency: "6天/周", 
      difficulty: "中级"
    }
  ];

  return (
    <div className="pb-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">训练计划</h1>
        <Button variant="outline" size="sm">
          <span className="text-lg mr-2">📋</span>
          新建计划
        </Button>
      </div>

      {/* Current Week Progress */}
      <Card className="bg-fitness-card border-border mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">本周进度</CardTitle>
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              第 {selectedWeek} 周
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">完成度</span>
              <span className="text-foreground font-medium">
                {weekProgress.completed}/{weekProgress.total} ({weekProgress.percentage}%)
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${weekProgress.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            {weeklyPlan[1].map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    day.completed ? 'bg-fitness-success' : 
                    day.name.includes('休息') ? 'bg-muted' : 'bg-border'
                  }`} />
                  <div>
                    <div className="font-medium text-foreground">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{day.name}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{day.duration}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Templates */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">训练模板</h2>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <Card key={index} className="bg-fitness-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <Badge variant="secondary" className={
                    template.difficulty === "初级" ? "bg-fitness-success" :
                    template.difficulty === "中级" ? "bg-fitness-warning" : "bg-destructive"
                  }>
                    {template.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>时长: {template.duration}</span>
                  <span>频率: {template.frequency}</span>
                </div>
                <Button variant="outline" className="w-full">
                  使用模板
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Workout Tips */}
      <Card className="bg-fitness-card border-border mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <span className="text-lg mr-2">💡</span>
            训练建议
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 每周至少安排1-2天休息日，让肌肉充分恢复</p>
          <p>• 训练前进行5-10分钟热身，预防运动损伤</p>
          <p>• 保持训练记录，及时调整重量和次数</p>
          <p>• 配合适当的饮食和睡眠，提高训练效果</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plans;