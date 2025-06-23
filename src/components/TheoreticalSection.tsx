
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Code, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TheoreticalSectionProps {
  onComplete: () => void;
}

const TheoreticalSection = ({ onComplete }: TheoreticalSectionProps) => {
  const [answers, setAnswers] = useState({
    q1: "AI-driven code generation tools like GitHub Copilot significantly reduce development time by providing instant, context-aware code suggestions. They accelerate development by: 1) Auto-completing repetitive code patterns, 2) Generating boilerplate code instantly, 3) Suggesting optimized algorithms and data structures, 4) Providing documentation and comments. However, limitations include: dependency on training data quality, potential security vulnerabilities in suggested code, lack of domain-specific knowledge, and over-reliance leading to reduced coding skills. The generated code may also contain bugs or inefficient patterns that require human review.",
    q2: "Supervised learning in automated bug detection uses labeled datasets of known bugs and clean code to train models that can classify new code as buggy or clean. It excels at detecting specific, known bug patterns with high accuracy. Examples include detecting null pointer exceptions or memory leaks. Unsupervised learning, however, identifies anomalies and unusual patterns in code without prior labeling. It's effective for discovering new types of bugs or code smells by analyzing code structure, complexity metrics, and execution patterns. While supervised learning is more precise for known issues, unsupervised learning is better for novel bug discovery and code quality assessment.",
    q3: "Bias mitigation is critical in AI-driven UX personalization because biased algorithms can: 1) Exclude or discriminate against certain user groups, 2) Reinforce existing societal inequalities, 3) Create filter bubbles that limit user exposure to diverse content, 4) Lead to unfair treatment based on demographic characteristics. This can result in poor user experience for underrepresented groups, legal compliance issues, and damage to brand reputation. Proper bias mitigation ensures inclusive design, fair access to features, and ethical AI deployment that serves all users equitably.",
    caseStudy: "AIOps improves software deployment efficiency through intelligent automation and predictive analytics. Two key examples: 1) Automated Incident Response - AIOps tools like Dynatrace automatically detect anomalies in deployment metrics, correlate issues across systems, and trigger automated rollback procedures, reducing mean time to recovery (MTTR) from hours to minutes. 2) Predictive Deployment Planning - Tools like DataDog use historical deployment data and system performance metrics to predict optimal deployment windows, resource requirements, and potential failure points, enabling proactive scaling and reducing deployment failures by up to 60%. These improvements result in faster delivery cycles, improved system reliability, and reduced operational overhead."
  });

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    const allAnswered = Object.values(answers).every(answer => answer.trim().length > 50);
    if (allAnswered) {
      toast({
        title: "Theoretical Section Completed!",
        description: "All questions have been answered comprehensively.",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Answers",
        description: "Please provide detailed answers (minimum 50 characters each).",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Theoretical Analysis (30%)
          </CardTitle>
          <CardDescription>
            Demonstrate your understanding of AI applications in software engineering through comprehensive analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Short Answers</Badge>
            <Badge variant="outline">Case Study</Badge>
            <Badge variant="outline">Critical Analysis</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Short Answer Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Short Answer Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Q1 */}
          <div>
            <div className="flex items-start gap-2 mb-3">
              <Code className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Q1: AI-Driven Code Generation</h4>
                <p className="text-sm text-gray-600">
                  Explain how AI-driven code generation tools (e.g., GitHub Copilot) reduce development time. What are their limitations?
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Discuss efficiency benefits, time savings, and key limitations..."
              value={answers.q1}
              onChange={(e) => handleAnswerChange("q1", e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {/* Q2 */}
          <div>
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Q2: Machine Learning in Bug Detection</h4>
                <p className="text-sm text-gray-600">
                  Compare supervised and unsupervised learning in the context of automated bug detection.
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Compare approaches, strengths, weaknesses, and use cases..."
              value={answers.q2}
              onChange={(e) => handleAnswerChange("q2", e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {/* Q3 */}
          <div>
            <div className="flex items-start gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Q3: Bias Mitigation in UX Personalization</h4>
                <p className="text-sm text-gray-600">
                  Why is bias mitigation critical when using AI for user experience personalization?
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Discuss ethical implications, fairness concerns, and impact on users..."
              value={answers.q3}
              onChange={(e) => handleAnswerChange("q3", e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Case Study Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Case Study Analysis
          </CardTitle>
          <CardDescription>
            Read the article: "AI in DevOps: Automating Deployment Pipelines"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-semibold text-blue-800 mb-2">Question:</h4>
            <p className="text-blue-700">
              How does AIOps improve software deployment efficiency? Provide two examples.
            </p>
          </div>
          <Textarea
            placeholder="Analyze AIOps benefits with specific examples of efficiency improvements..."
            value={answers.caseStudy}
            onChange={(e) => handleAnswerChange("caseStudy", e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Complete Theoretical Analysis
        </Button>
      </div>
    </div>
  );
};

export default TheoreticalSection;
