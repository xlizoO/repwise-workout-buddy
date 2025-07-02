import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/stats/StatsCard";

const Progress = () => {
  const monthlyStats = [
    { title: "总训练次数", value: "16", change: "+25% vs 上月", changeType: "positive" as const, icon: "💪" },
    { title: "训练时长", value: "14.2h", change: "+3.2h vs 上月", changeType: "positive" as const, icon: "⏰" },
    { title: "总重量", value: "12.8t", change: "+2.1t vs 上月", changeType: "positive" as const, icon: "🏋️" },
    { title: "卡路里消耗", value: "4,850", change: "+12% vs 上月", changeType: "positive" as const, icon: "🔥" }
  ];

  const personalRecords = [
    { exercise: "深蹲", weight: "120kg", date: "2024-01-15", improvement: "+5kg" },
    { exercise: "卧推", weight: "85kg", date: "2024-01-12", improvement: "+2.5kg" },
    { exercise: "硬拉", weight: "140kg", date: "2024-01-10", improvement: "+10kg" },
    { exercise: "肩部推举", weight: "30kg", date: "2024-01-08", improvement: "+5kg" },
  ];

  const achievements = [
    { title: "连续训练达人", description: "连续训练10天", icon: "🔥", completed: true },
    { title: "重量挑战者", description: "单次训练总重量达到2吨", icon: "💪", completed: true },
    { title: "持之以恒", description: "连续训练30天", icon: "⭐", completed: false, progress: "12/30" },
    { title: "全方位发展", description: "完成所有肌群训练", icon: "🎯", completed: false, progress: "4/6" },
  ];

  const weeklyData = [
    { week: "第1周", workouts: 3, duration: 150 },
    { week: "第2周", workouts: 4, duration: 200 },
    { week: "第3周", workouts: 4, duration: 180 },
    { week: "第4周", workouts: 5, duration: 250 },
  ];

  return (
    <div className="pb-20 px-4">
      <h1 className="text-2xl font-bold text-foreground mb-6">训练进度</h1>

      {/* Monthly Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">本月概览</h2>
        <div className="grid grid-cols-2 gap-4">
          {monthlyStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Personal Records */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">个人记录</h2>
        <Card className="bg-fitness-card border-border">
          <CardContent className="p-4">
            <div className="space-y-3">
              {personalRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <div className="font-medium text-foreground">{record.exercise}</div>
                    <div className="text-sm text-muted-foreground">{record.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary text-lg">{record.weight}</div>
                    <div className="text-xs text-fitness-success">{record.improvement}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">本月趋势</h2>
        <Card className="bg-fitness-card border-border">
          <CardContent className="p-4">
            <div className="space-y-4">
              {weeklyData.map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{week.week}</span>
                    <span className="text-muted-foreground">{week.workouts}次训练 • {week.duration}分钟</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(week.duration / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">成就系统</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-fitness-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-foreground">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {achievement.completed ? (
                      <Badge className="bg-fitness-success text-background">已完成</Badge>
                    ) : (
                      <Badge variant="secondary">{achievement.progress}</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;