
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Zap, User, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CodeCompletionTaskProps {
  onComplete: () => void;
}

const CodeCompletionTask = ({ onComplete }: CodeCompletionTaskProps) => {
  const [aiCode, setAiCode] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [analysis, setAnalysis] = useState("");

  const sampleAICode = `# AI-Suggested Code (GitHub Copilot)
def sort_dict_list(dict_list, key):
    """Sort a list of dictionaries by a specific key."""
    return sorted(dict_list, key=lambda x: x.get(key, 0))

# Example usage:
# data = [{'name': 'John', 'age': 30}, {'name': 'Jane', 'age': 25}]
# sorted_data = sort_dict_list(data, 'age')`;

  const sampleManualCode = `# Manual Implementation
def sort_dict_list_manual(dict_list, key):
    """Manually written function to sort dictionaries by key."""
    if not dict_list or not isinstance(dict_list, list):
        return []
    
    try:
        return sorted(dict_list, key=lambda item: item[key])
    except KeyError:
        print(f"Key '{key}' not found in dictionary")
        return dict_list
    except Exception as e:
        print(f"Error sorting: {e}")
        return dict_list`;

  const handleSubmit = () => {
    if (aiCode.trim() && manualCode.trim() && analysis.trim()) {
      toast({
        title: "Task 1 Completed!",
        description: "Code completion comparison has been documented.",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Task",
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
            <Code className="w-5 h-5" />
            Task 1: AI-Powered Code Completion
          </CardTitle>
          <CardDescription>
            Compare AI-generated code with manual implementation for sorting dictionaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">Python Function</Badge>
            <Badge variant="outline">Dictionary Sorting</Badge>
            <Badge variant="outline">GitHub Copilot</Badge>
            <Badge variant="outline">Performance Analysis</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Objective:</strong> Write a Python function to sort a list of dictionaries by a specific key, 
            then compare AI-suggested vs manual implementations.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="ai-code" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-code" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            AI Code
          </TabsTrigger>
          <TabsTrigger value="manual-code" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Manual Code
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-code">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                AI-Generated Code
              </CardTitle>
              <CardDescription>
                Paste the code suggested by GitHub Copilot or similar AI tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Example AI-Generated Code:</h4>
                <pre className="text-sm overflow-x-auto">{sampleAICode}</pre>
              </div>
              <Textarea
                placeholder="Paste your AI-generated code here..."
                value={aiCode}
                onChange={(e) => setAiCode(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual-code">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Manual Implementation
              </CardTitle>
              <CardDescription>
                Write your own implementation without AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Example Manual Implementation:</h4>
                <pre className="text-sm overflow-x-auto">{sampleManualCode}</pre>
              </div>
              <Textarea
                placeholder="Write your manual implementation here..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Comparative Analysis
              </CardTitle>
              <CardDescription>
                Analyze which version is more efficient and why (200 words)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <h4 className="font-semibold text-blue-800 mb-2">AI Code Benefits</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Faster development time</li>
                    <li>• Often includes documentation</li>
                    <li>• Follows common patterns</li>
                    <li>• May include examples</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border">
                  <h4 className="font-semibold text-green-800 mb-2">Manual Code Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Better error handling</li>
                    <li>• Domain-specific logic</li>
                    <li>• Full control over implementation</li>
                    <li>• Custom optimizations</li>
                  </ul>
                </div>
              </div>
              <Textarea
                placeholder="Compare the two implementations. Consider factors like readability, efficiency, error handling, maintainability, and correctness. Which approach is better and why?"
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Complete Task 1
        </Button>
      </div>
    </div>
  );
};

export default CodeCompletionTask;
