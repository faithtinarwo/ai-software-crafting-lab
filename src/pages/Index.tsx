
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Brain, Shield, Star, CheckCircle } from "lucide-react";
import TheoreticalSection from "@/components/TheoreticalSection";
import PracticalSection from "@/components/PracticalSection";
import EthicalSection from "@/components/EthicalSection";
import BonusSection from "@/components/BonusSection";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const sections = [
    { id: "theoretical", title: "Theoretical Analysis", weight: 30, icon: BookOpen },
    { id: "practical", title: "Practical Implementation", weight: 50, icon: Code },
    { id: "ethical", title: "Ethical Reflection", weight: 10, icon: Shield },
    { id: "bonus", title: "Bonus Task", weight: 10, icon: Star },
  ];

  const overallProgress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&h=300&q=80" 
              alt="AI Robot - Artificial Intelligence in Software Engineering"
              className="rounded-2xl shadow-2xl w-80 h-60 object-cover border-4 border-white"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI in Software Engineering Assignment
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Building Intelligent Software Solutions 💻🤖
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge variant="outline" className="text-sm">
              <Brain className="w-4 h-4 mr-1" />
              Week 4 Assignment
            </Badge>
            <Badge variant="outline" className="text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              {completedSections.length}/{sections.length} Completed
            </Badge>
          </div>
          <Progress value={overallProgress} className="w-full max-w-md mx-auto" />
        </div>

        {/* Progress Tracker */}
        <ProgressTracker 
          sections={sections} 
          completedSections={completedSections}
          className="mb-8"
        />

        {/* Main Content */}
        <Tabs defaultValue="theoretical" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="theoretical" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Theoretical (30%)
            </TabsTrigger>
            <TabsTrigger value="practical" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Practical (50%)
            </TabsTrigger>
            <TabsTrigger value="ethical" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Ethical (10%)
            </TabsTrigger>
            <TabsTrigger value="bonus" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Bonus (10%)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theoretical">
            <TheoreticalSection 
              onComplete={() => setCompletedSections(prev => 
                prev.includes("theoretical") ? prev : [...prev, "theoretical"]
              )}
            />
          </TabsContent>

          <TabsContent value="practical">
            <PracticalSection 
              onComplete={() => setCompletedSections(prev => 
                prev.includes("practical") ? prev : [...prev, "practical"]
              )}
            />
          </TabsContent>

          <TabsContent value="ethical">
            <EthicalSection 
              onComplete={() => setCompletedSections(prev => 
                prev.includes("ethical") ? prev : [...prev, "ethical"]
              )}
            />
          </TabsContent>

          <TabsContent value="bonus">
            <BonusSection 
              onComplete={() => setCompletedSections(prev => 
                prev.includes("bonus") ? prev : [...prev, "bonus"]
              )}
            />
          </TabsContent>
        </Tabs>

        {/* Submission Guidelines */}
        <Card className="mt-8 border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Submission Guidelines</CardTitle>
            <CardDescription className="text-green-700">
              Remember to submit all required deliverables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold mb-1">Code</h3>
                <p className="text-sm text-gray-600">Well-commented scripts/notebooks shared on GitHub</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold mb-1">Report</h3>
                <p className="text-sm text-gray-600">PDF with answers, screenshots, and reflections</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Brain className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h3 className="font-semibold mb-1">Presentation</h3>
                <p className="text-sm text-gray-600">3-minute video demo of AI implementation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
