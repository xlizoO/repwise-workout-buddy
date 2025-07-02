import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WorkoutCard from "@/components/workout/WorkoutCard";
import StatsCard from "@/components/stats/StatsCard";
import fitnessHero from "@/assets/fitness-hero.jpg";

const Dashboard = () => {
  const todayWorkout = {
    id: "chest-shoulders-today",
    title: "胸部 + 三角肌",
    exercises: [
      { name: "杠铃卧推", sets: 4, reps: "8-10", weight: 80 },
      { name: "哑铃飞鸟", sets: 3, reps: "12-15", weight: 15 },
      { name: "肩部推举", sets: 4, reps: "10-12", weight: 25 },
      { name: "侧平举", sets: 3, reps: "15-20", weight: 8 },
    ],
    duration: "45-60分钟",
    difficulty: "中级" as const
  };

  const weeklyStats = [
    { title: "本周训练", value: "4", change: "+1 vs 上周", changeType: "positive" as const, icon: "💪" },
    { title: "总重量", value: "2.4t", change: "+15% vs 上周", changeType: "positive" as const, icon: "🏋️" },
    { title: "平均时长", value: "52分钟", change: "-5分钟", changeType: "positive" as const, icon: "⏱️" },
    { title: "连续天数", value: "12天", change: "新记录!", changeType: "positive" as const, icon: "🔥" }
  ];

  return (
    <div className="pb-20"> {/* Bottom padding for navigation */}
      {/* Hero Section */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
        <img 
          src={fitnessHero} 
          alt="Fitness Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            RepMate
          </h1>
          <p className="text-muted-foreground">
            你的健身搭子，让每一次训练都更精准
          </p>
        </div>
      </div>

      <div className="space-y-6 px-4">
        {/* Weekly Stats */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">本周概览</h2>
          <div className="grid grid-cols-2 gap-4">
            {weeklyStats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Today's Workout */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">今日训练</h2>
          <WorkoutCard 
            {...todayWorkout}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <span className="text-2xl">📝</span>
              <span>自定义训练</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <span className="text-2xl">📊</span>
              <span>查看进度</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-fitness-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">最近活动</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">昨天</span>
              <span className="text-foreground">背部训练 - 55分钟</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">前天</span>
              <span className="text-foreground">腿部训练 - 48分钟</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">3天前</span>
              <span className="text-foreground">胸部训练 - 52分钟</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;