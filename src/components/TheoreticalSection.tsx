
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TheoreticalSectionProps {
  onComplete: () => void;
}

const TheoreticalSection = ({ onComplete }: TheoreticalSectionProps) => {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    caseStudy: ""
  });

  const questions = [
    {
      id: "q1",
      question: "Explain how AI-driven code generation tools (e.g., GitHub Copilot) reduce development time. What are their limitations?",
      placeholder: "Discuss autocomplete, context understanding, speed benefits, and limitations like accuracy, security concerns..."
    },
    {
      id: "q2", 
      question: "Compare supervised and unsupervised learning in the context of automated bug detection.",
      placeholder: "Compare labeled vs unlabeled data approaches, clustering vs classification for bug detection..."
    },
    {
      id: "q3",
      question: "Why is bias mitigation critical when using AI for user experience personalization?",
      placeholder: "Discuss fairness, representation, algorithmic bias, and user trust..."
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const allAnswered = Object.values(answers).every(answer => answer.trim().length > 0);
    
    if (allAnswered) {
      toast({
        title: "Theoretical Section Completed!",
        description: "All questions have been answered. Great work!",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Answers",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Part 1: Theoretical Analysis (30%)
          </CardTitle>
          <CardDescription>
            Answer short questions and analyze a case study to demonstrate your understanding of AI in software engineering.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Short Answer Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Short Answer Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-1">Q{index + 1}</Badge>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                  <Textarea
                    placeholder={q.placeholder}
                    value={answers[q.id as keyof typeof answers]}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Case Study */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Case Study Analysis
          </CardTitle>
          <CardDescription>
            Read the article: "AI in DevOps: Automating Deployment Pipelines" and answer the following question.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="font-medium text-blue-900">
                Question: How does AIOps improve software deployment efficiency? Provide two examples.
              </p>
            </div>
            <Textarea
              placeholder="Discuss how AIOps enhances deployment efficiency through automation, predictive analytics, anomaly detection, etc. Provide specific examples..."
              value={answers.caseStudy}
              onChange={(e) => handleAnswerChange("caseStudy", e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Complete Theoretical Section
        </Button>
      </div>
    </div>
  );
};

export default TheoreticalSection;
