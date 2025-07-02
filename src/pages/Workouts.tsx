import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorkoutCard from "@/components/workout/WorkoutCard";

const Workouts = () => {
  const [activeTab, setActiveTab] = useState<"recommended" | "custom">("recommended");

  const recommendedWorkouts = [
    {
      title: "胸部强化训练",
      exercises: [
        { name: "杠铃卧推", sets: 4, reps: "8-10", weight: 80 },
        { name: "斜板卧推", sets: 3, reps: "10-12", weight: 70 },
        { name: "哑铃飞鸟", sets: 3, reps: "12-15", weight: 15 },
        { name: "双杠臂屈伸", sets: 3, reps: "12-15" },
      ],
      duration: "45-50分钟",
      difficulty: "中级" as const
    },
    {
      title: "背部塑形训练", 
      exercises: [
        { name: "引体向上", sets: 4, reps: "6-8" },
        { name: "杠铃划船", sets: 4, reps: "8-10", weight: 60 },
        { name: "坐姿划船", sets: 3, reps: "10-12", weight: 45 },
        { name: "高位下拉", sets: 3, reps: "12-15", weight: 50 },
      ],
      duration: "50-55分钟", 
      difficulty: "高级" as const
    },
    {
      title: "腿部基础训练",
      exercises: [
        { name: "深蹲", sets: 4, reps: "10-12", weight: 100 },
        { name: "硬拉", sets: 3, reps: "8-10", weight: 120 },
        { name: "腿举", sets: 3, reps: "15-20", weight: 180 },
        { name: "腿弯举", sets: 3, reps: "12-15", weight: 30 },
      ],
      duration: "55-60分钟",
      difficulty: "中级" as const
    },
    {
      title: "肩部雕刻训练",
      exercises: [
        { name: "肩部推举", sets: 4, reps: "8-10", weight: 25 },
        { name: "侧平举", sets: 4, reps: "12-15", weight: 8 },
        { name: "前平举", sets: 3, reps: "12-15", weight: 8 },
        { name: "俯身飞鸟", sets: 3, reps: "15-20", weight: 6 },
      ],
      duration: "40-45分钟",
      difficulty: "初级" as const
    }
  ];

  const customWorkouts = [
    {
      title: "我的上肢训练",
      exercises: [
        { name: "引体向上", sets: 3, reps: "5-8" },
        { name: "俯卧撑", sets: 4, reps: "15-20" },
        { name: "哑铃弯举", sets: 3, reps: "12-15", weight: 12 },
      ],
      duration: "30分钟",
      difficulty: "中级" as const
    }
  ];

  return (
    <div className="pb-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">训练库</h1>
        <Button variant="outline" size="sm">
          <span className="text-lg mr-2">➕</span>
          新建训练
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-secondary rounded-lg p-1 mb-6">
        <Button
          variant={activeTab === "recommended" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveTab("recommended")}
        >
          推荐训练
        </Button>
        <Button
          variant={activeTab === "custom" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveTab("custom")}
        >
          我的训练
        </Button>
      </div>

      {/* Workout Cards */}
      <div className="space-y-4">
        {activeTab === "recommended" ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">专业推荐</h2>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {recommendedWorkouts.length} 个训练
              </Badge>
            </div>
            {recommendedWorkouts.map((workout, index) => (
              <WorkoutCard 
                key={index} 
                {...workout}
                onStart={() => console.log(`开始${workout.title}`)}
              />
            ))}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">自定义训练</h2>
              <Badge variant="secondary">
                {customWorkouts.length} 个训练
              </Badge>
            </div>
            {customWorkouts.map((workout, index) => (
              <WorkoutCard 
                key={index} 
                {...workout}
                onStart={() => console.log(`开始${workout.title}`)}
              />
            ))}
            
            {/* Empty State for Custom Workouts */}
            {customWorkouts.length === 0 && (
              <Card className="bg-fitness-card border-border border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-4xl mb-4">💪</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    还没有自定义训练
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    创建你的专属训练计划，让健身更个性化
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    创建第一个训练
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workouts;