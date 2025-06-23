
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, Lightbulb, Workflow, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BonusSectionProps {
  onComplete: () => void;
}

const BonusSection = ({ onComplete }: BonusSectionProps) => {
  const [proposal, setProposal] = useState({
    toolName: "",
    problem: "",
    purpose: "",
    workflow: "",
    impact: "",
    technicalDetails: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setProposal(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = ["toolName", "problem", "purpose", "workflow", "impact"];
    const isComplete = requiredFields.every(field => 
      proposal[field as keyof typeof proposal].trim().length > 0
    );
    
    if (isComplete) {
      toast({
        title: "Bonus Task Completed!",
        description: "Your innovative AI tool proposal has been submitted. Excellent creativity!",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Proposal",
        description: "Please complete all required fields before submitting.",
        variant: "destructive",
      });
    }
  };

  const exampleIdeas = [
    "Automated documentation generation from code comments",
    "AI-powered code review assistant",
    "Smart dependency vulnerability scanner",
    "Automated API documentation generator",
    "Intelligent code refactoring suggestions",
    "AI-driven performance optimization recommendations"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Bonus Task: Innovation Challenge (Extra 10%)
          </CardTitle>
          <CardDescription>
            Propose an AI tool to solve a software engineering problem not covered in class. 
            This is your chance to showcase creativity and innovation!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="mb-4">
            1-page proposal outlining purpose, workflow, and impact
          </Badge>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">💡 Example Ideas</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                {exampleIdeas.map((idea, index) => (
                  <li key={index}>• {idea}</li>
                ))}
              </ul>
            </Card>
            
            <Card className="p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Success Criteria</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Addresses a real problem</li>
                <li>• Technically feasible</li>
                <li>• Clear value proposition</li>
                <li>• Innovative approach</li>
                <li>• Measurable impact</li>
              </ul>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Tool Proposal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="toolName">Tool Name *</Label>
              <Input
                id="toolName"
                placeholder="e.g., CodeDocAI, SmartRefactor, VulnGuard"
                value={proposal.toolName}
                onChange={(e) => handleInputChange("toolName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="problem">Problem Statement *</Label>
              <Input
                id="problem"
                placeholder="What specific problem does this solve?"
                value={proposal.problem}
                onChange={(e) => handleInputChange("problem", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose & Objectives *</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the tool's main purpose and what it aims to achieve..."
              value={proposal.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="workflow" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflow & Implementation *
            </Label>
            <Textarea
              id="workflow"
              placeholder="Explain how the tool works, its workflow, and implementation approach..."
              value={proposal.workflow}
              onChange={(e) => handleInputChange("workflow", e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="impact" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Expected Impact *
            </Label>
            <Textarea
              id="impact"
              placeholder="Describe the expected benefits, metrics for success, and potential impact on software development..."
              value={proposal.impact}
              onChange={(e) => handleInput("impact", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="technicalDetails">Technical Details (Optional)</Label>
            <Textarea
              id="technicalDetails"
              placeholder="Additional technical considerations, technologies, APIs, or implementation details..."
              value={proposal.technicalDetails}
              onChange={(e) => handleInputChange("technicalDetails", e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Submit Innovation Proposal
        </Button>
      </div>
    </div>
  );
};

export default BonusSection;
