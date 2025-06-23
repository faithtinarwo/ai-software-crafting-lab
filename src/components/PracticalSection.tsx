
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, TestTube, BarChart, CheckCircle } from "lucide-react";
import CodeCompletionTask from "@/components/tasks/CodeCompletionTask";
import AutomatedTestingTask from "@/components/tasks/AutomatedTestingTask";
import PredictiveAnalyticsTask from "@/components/tasks/PredictiveAnalyticsTask";
import { toast } from "@/hooks/use-toast";

interface PracticalSectionProps {
  onComplete: () => void;
}

const PracticalSection = ({ onComplete }: PracticalSectionProps) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks = [
    { id: "task1", title: "AI-Powered Code Completion", icon: Code, component: CodeCompletionTask },
    { id: "task2", title: "Automated Testing with AI", icon: TestTube, component: AutomatedTestingTask },
    { id: "task3", title: "Predictive Analytics", icon: BarChart, component: PredictiveAnalyticsTask },
  ];

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) ? prev : [...prev, taskId]
    );
    
    toast({
      title: "Task Completed!",
      description: `Task ${taskId.slice(-1)} has been completed successfully.`,
    });
  };

  const handleSectionComplete = () => {
    if (completedTasks.length === tasks.length) {
      onComplete();
      toast({
        title: "Practical Section Completed!",
        description: "All practical tasks have been completed. Excellent work!",
      });
    } else {
      toast({
        title: "Tasks Remaining",
        description: `Please complete all ${tasks.length} tasks before finishing this section.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Part 2: Practical Implementation (60%)
          </CardTitle>
          <CardDescription>
            Complete three hands-on tasks demonstrating AI applications in software engineering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {tasks.map((task) => (
              <Badge
                key={task.id}
                variant={completedTasks.includes(task.id) ? "default" : "outline"}
                className="flex items-center gap-1"
              >
                {completedTasks.includes(task.id) && <CheckCircle className="w-3 h-3" />}
                {task.title}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Progress: {completedTasks.length}/{tasks.length} tasks completed
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="task1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {tasks.map((task) => {
            const Icon = task.icon;
            const isCompleted = completedTasks.includes(task.id);
            
            return (
              <TabsTrigger 
                key={task.id}
                value={task.id} 
                className="flex items-center gap-2 relative"
              >
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-green-600 absolute -top-1 -right-1" />
                )}
                <Icon className="w-4 h-4" />
                Task {task.id.slice(-1)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tasks.map((task) => {
          const TaskComponent = task.component;
          return (
            <TabsContent key={task.id} value={task.id}>
              <TaskComponent onComplete={() => handleTaskComplete(task.id)} />
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSectionComplete} 
          size="lg" 
          className="px-8"
          disabled={completedTasks.length !== tasks.length}
        >
          Complete Practical Section
        </Button>
      </div>
    </div>
  );
};

export default PracticalSection;
