
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Users, Scale } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EthicalSectionProps {
  onComplete: () => void;
}

const EthicalSection = ({ onComplete }: EthicalSectionProps) => {
  const [responses, setResponses] = useState({
    biases: "",
    fairnessTools: "",
    recommendations: ""
  });

  const prompts = [
    {
      id: "biases",
      icon: AlertTriangle,
      title: "Identify Potential Biases",
      description: "Discuss potential biases in the dataset (e.g., underrepresented teams, historical inequities)",
      placeholder: "Consider biases in data collection, representation of different groups, historical patterns..."
    },
    {
      id: "fairnessTools",
      icon: Scale,
      title: "Fairness Tools Application",
      description: "How could fairness tools like IBM AI Fairness 360 address these biases?",
      placeholder: "Explain bias detection, mitigation strategies, fairness metrics, algorithmic auditing..."
    },
    {
      id: "recommendations",
      icon: Users,
      title: "Ethical Recommendations",
      description: "Provide recommendations for ethical deployment of your predictive model",
      placeholder: "Suggest monitoring practices, stakeholder involvement, transparency measures..."
    }
  ];

  const handleResponseChange = (promptId: string, value: string) => {
    setResponses(prev => ({ ...prev, [promptId]: value }));
  };

  const handleSubmit = () => {
    const allCompleted = Object.values(responses).every(response => response.trim().length > 0);
    
    if (allCompleted) {
      toast({
        title: "Ethical Reflection Completed!",
        description: "Your ethical analysis has been recorded. Well done!",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Analysis",
        description: "Please complete all sections before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Part 3: Ethical Reflection (10%)
          </CardTitle>
          <CardDescription>
            Analyze the ethical implications of deploying your predictive model in a real-world scenario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-semibold text-amber-800 mb-2">Scenario:</h4>
            <p className="text-amber-700">
              Your predictive model from Task 3 is deployed in a company to prioritize software issues. 
              Consider the ethical implications and potential consequences.
            </p>
          </div>
        </CardContent>
      </Card>

      {prompts.map((prompt) => {
        const Icon = prompt.icon;
        return (
          <Card key={prompt.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {prompt.title}
              </CardTitle>
              <CardDescription>{prompt.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={prompt.placeholder}
                value={responses[prompt.id as keyof typeof responses]}
                onChange={(e) => handleResponseChange(prompt.id, e.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        );
      })}

      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Key Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Bias Sources</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Historical data inequities</li>
                <li>• Underrepresented groups</li>
                <li>• Sampling bias</li>
                <li>• Labeling inconsistencies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Mitigation Strategies</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Regular bias audits</li>
                <li>• Diverse training data</li>
                <li>• Fairness-aware algorithms</li>
                <li>• Stakeholder feedback loops</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Complete Ethical Reflection
        </Button>
      </div>
    </div>
  );
};

export default EthicalSection;
