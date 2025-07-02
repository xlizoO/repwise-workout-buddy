import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  tips?: string;
  completed?: boolean;
}

interface WorkoutSession {
  id: string;
  title: string;
  exercises: Exercise[];
  duration: string;
}

const WorkoutSession = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [repCount, setRepCount] = useState(0);
  const [isCountingReps, setIsCountingReps] = useState(false);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);

  // 模拟训练数据
  const workout: WorkoutSession = {
    id: workoutId || "1",
    title: "胸部 + 三角肌训练",
    exercises: [
      {
        id: "1",
        name: "杠铃卧推",
        sets: 4,
        reps: "8-10",
        weight: 80,
        tips: "保持背部紧贴椅背，控制下降速度，胸部发力推起"
      },
      {
        id: "2", 
        name: "哑铃飞鸟",
        sets: 3,
        reps: "12-15",
        weight: 15,
        tips: "手臂微曲，感受胸部拉伸，缓慢控制动作"
      },
      {
        id: "3",
        name: "肩部推举", 
        sets: 4,
        reps: "10-12",
        weight: 25,
        tips: "核心收紧，肩部发力，避免借力"
      },
      {
        id: "4",
        name: "侧平举",
        sets: 3,
        reps: "15-20", 
        weight: 8,
        tips: "肩部主导动作，控制重量下降"
      }
    ],
    duration: "45-60分钟"
  };

  // 语音播报功能
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // 开始计数
  const startReps = (exerciseIndex: number) => {
    setCurrentExercise(exerciseIndex);
    setCurrentSet(1);
    setRepCount(0);
    setIsCountingReps(true);
    setSessionStarted(true);
    
    const exercise = workout.exercises[exerciseIndex];
    speak(`开始 ${exercise.name}，第 ${currentSet} 组`);
  };

  // 增加次数
  const incrementRep = () => {
    if (isCountingReps) {
      const newCount = repCount + 1;
      setRepCount(newCount);
      speak(`${newCount}`);
    }
  };

  // 完成当前组
  const completeSet = () => {
    if (currentExercise === null) return;
    
    const exercise = workout.exercises[currentExercise];
    const setKey = currentExercise * 10 + currentSet;
    setCompletedSets([...completedSets, setKey]);
    
    if (currentSet < exercise.sets) {
      // 还有下一组
      const nextSet = currentSet + 1;
      setCurrentSet(nextSet);
      setRepCount(0);
      speak(`第 ${currentSet} 组完成，准备第 ${nextSet} 组`);
    } else {
      // 这个动作完成了
      setIsCountingReps(false);
      setCurrentExercise(null);
      setCurrentSet(1);
      setRepCount(0);
      speak(`${exercise.name} 全部完成，休息一下`);
    }
  };

  // 重置当前组
  const resetSet = () => {
    setRepCount(0);
    if (currentExercise !== null) {
      const exercise = workout.exercises[currentExercise];
      speak(`重新开始 ${exercise.name} 第 ${currentSet} 组`);
    }
  };

  // 计算总进度
  const calculateProgress = () => {
    const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    return (completedSets.length / totalSets) * 100;
  };

  // 检查组是否完成
  const isSetCompleted = (exerciseIndex: number, setNumber: number) => {
    const setKey = exerciseIndex * 10 + setNumber;
    return completedSets.includes(setKey);
  };

  return (
    <div className="pb-20 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2 p-0 text-muted-foreground hover:text-foreground"
          >
            ← 返回
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{workout.title}</h1>
        </div>
        <Badge variant="secondary">
          预计 {workout.duration}
        </Badge>
      </div>

      {/* Progress Bar */}
      {sessionStarted && (
        <Card className="bg-fitness-card border-border mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">训练进度</span>
              <span className="text-sm font-medium text-foreground">
                {completedSets.length}/{workout.exercises.reduce((sum, ex) => sum + ex.sets, 0)} 组
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Rep Counter - 只在计数时显示 */}
      {isCountingReps && currentExercise !== null && (
        <Card className="bg-fitness-card border-border mb-6">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {workout.exercises[currentExercise].name}
              </h2>
              <Badge variant="outline" className="text-sm">
                第 {currentSet} 组 / 共 {workout.exercises[currentExercise].sets} 组
              </Badge>
            </div>
            
            {/* 大计数器 */}
            <div 
              className="text-8xl font-bold text-primary mb-6 cursor-pointer select-none"
              onClick={incrementRep}
            >
              {repCount}
            </div>
            
            <div className="text-sm text-muted-foreground mb-6">
              目标: {workout.exercises[currentExercise].reps} 次
              {workout.exercises[currentExercise].weight && 
                ` @ ${workout.exercises[currentExercise].weight}kg`
              }
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={incrementRep}
                className="flex-1 max-w-32"
              >
                +1 次
              </Button>
              <Button 
                variant="outline" 
                onClick={resetSet}
                className="flex-1 max-w-32"
              >
                重置
              </Button>
              <Button 
                onClick={completeSet}
                className="flex-1 max-w-32 bg-primary hover:bg-primary/90"
              >
                完成这组
              </Button>
            </div>

            {/* 动作要点 */}
            {workout.exercises[currentExercise].tips && (
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-2">💡 动作要点</h3>
                <p className="text-sm text-muted-foreground">
                  {workout.exercises[currentExercise].tips}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Exercise List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">训练项目</h2>
        
        {workout.exercises.map((exercise, exerciseIndex) => (
          <Card 
            key={exercise.id} 
            className={`bg-fitness-card border-border ${
              currentExercise === exerciseIndex ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {exercise.weight && (
                    <Badge variant="outline">{exercise.weight}kg</Badge>
                  )}
                  <Badge variant="secondary">
                    {exercise.sets}组 x {exercise.reps}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 组数显示 */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: exercise.sets }, (_, setIndex) => {
                  const setNumber = setIndex + 1;
                  const isCompleted = isSetCompleted(exerciseIndex, setNumber);
                  const isCurrent = currentExercise === exerciseIndex && currentSet === setNumber;
                  
                  return (
                    <div
                      key={setIndex}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCompleted 
                          ? 'bg-fitness-success text-background' 
                          : isCurrent
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {setNumber}
                    </div>
                  );
                })}
              </div>

              {/* 开始按钮 */}
              {currentExercise !== exerciseIndex ? (
                <Button 
                  onClick={() => startReps(exerciseIndex)}
                  disabled={isCountingReps}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  开始训练
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsCountingReps(false);
                    setCurrentExercise(null);
                    setCurrentSet(1);
                    setRepCount(0);
                  }}
                  className="w-full"
                >
                  暂停训练
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 完成训练按钮 */}
      {sessionStarted && (
        <div className="mt-6">
          <Button 
            onClick={() => {
              speak("训练完成，辛苦了！");
              navigate('/progress');
            }}
            variant="outline"
            className="w-full"
          >
            结束训练
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkoutSession;