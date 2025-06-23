
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  sections: Array<{
    id: string;
    title: string;
    weight: number;
    icon: React.ComponentType<any>;
  }>;
  completedSections: string[];
  className?: string;
}

const ProgressTracker = ({ sections, completedSections, className }: ProgressTrackerProps) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Assignment Progress</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section) => {
            const isCompleted = completedSections.includes(section.id);
            const Icon = section.icon;
            
            return (
              <div 
                key={section.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                  isCompleted 
                    ? "border-green-200 bg-green-50" 
                    : "border-gray-200 bg-gray-50"
                )}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {section.title}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {section.weight}% weight
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
