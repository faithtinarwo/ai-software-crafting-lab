
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTube, FileCode, BarChart, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AutomatedTestingTaskProps {
  onComplete: () => void;
}

const AutomatedTestingTask = ({ onComplete }: AutomatedTestingTaskProps) => {
  const [testScript, setTestScript] = useState("");
  const [testResults, setTestResults] = useState({
    validCredentials: "",
    invalidCredentials: "",
    successRate: "",
    failureRate: ""
  });
  const [summary, setSummary] = useState("");

  const sampleTestScript = `// Selenium Test Script Example
describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login with valid credentials', () => {
    cy.get('[data-cy=username]').type('testuser@example.com');
    cy.get('[data-cy=password]').type('validpassword');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=welcome-message]').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-cy=username]').type('testuser@example.com');
    cy.get('[data-cy=password]').type('wrongpassword');
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=error-message]').should('contain', 'Invalid credentials');
    cy.url().should('include', '/login');
  });
});`;

  const handleResultChange = (field: string, value: string) => {
    setTestResults(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const allFieldsFilled = testScript.trim() && 
                           Object.values(testResults).every(val => val.trim()) &&
                           summary.trim();
    
    if (allFieldsFilled) {
      toast({
        title: "Task 2 Completed!",
        description: "Automated testing implementation has been documented.",
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
            <TestTube className="w-5 h-5" />
            Task 2: Automated Testing with AI
          </CardTitle>
          <CardDescription>
            Create automated tests for a login page using Selenium IDE or Testim.io with AI features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">Selenium IDE</Badge>
            <Badge variant="outline">Testim.io</Badge>
            <Badge variant="outline">Login Testing</Badge>
            <Badge variant="outline">AI Test Generation</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Objective:</strong> Automate testing for login functionality with both valid and invalid credentials, 
            then analyze AI's contribution to test coverage.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="script" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script" className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            Test Script
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="script">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-600" />
                Automated Test Script
              </CardTitle>
              <CardDescription>
                Paste your Selenium/Testim test script for login functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Example Test Script (Cypress/Selenium):</h4>
                <pre className="text-xs overflow-x-auto">{sampleTestScript}</pre>
              </div>
              <Textarea
                placeholder="Paste your automated test script here..."
                value={testScript}
                onChange={(e) => setTestScript(e.target.value)}
                className="font-mono text-sm min-h-[250px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                Test Results & Screenshots
              </CardTitle>
              <CardDescription>
                Document your test execution results and capture success/failure rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validResults">Valid Credentials Test Result</Label>
                  <Input
                    id="validResults"
                    placeholder="e.g., PASSED - Login successful"
                    value={testResults.validCredentials}
                    onChange={(e) => handleResultChange("validCredentials", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="invalidResults">Invalid Credentials Test Result</Label>
                  <Input
                    id="invalidResults"
                    placeholder="e.g., PASSED - Error message displayed"
                    value={testResults.invalidCredentials}
                    onChange={(e) => handleResultChange("invalidCredentials", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="successRate">Success Rate (%)</Label>
                  <Input
                    id="successRate"
                    placeholder="e.g., 95%"
                    value={testResults.successRate}
                    onChange={(e) => handleResultChange("successRate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="failureRate">Failure Rate (%)</Label>
                  <Input
                    id="failureRate"
                    placeholder="e.g., 5%"
                    value={testResults.failureRate}
                    onChange={(e) => handleResultChange("failureRate", e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border">
                <h4 className="font-semibold text-blue-800 mb-2">Screenshot Instructions</h4>
                <p className="text-sm text-blue-700">
                  Take screenshots of your test execution results showing passed/failed tests. 
                  Include these in your final report submission.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                AI Testing Analysis
              </CardTitle>
              <CardDescription>
                Explain how AI improves test coverage compared to manual testing (150 words)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border">
                  <h4 className="font-semibold text-green-800 mb-2">AI Testing Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Automated test generation</li>
                    <li>• Self-healing test scripts</li>
                    <li>• Smart element recognition</li>
                    <li>• Reduced maintenance effort</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border">
                  <h4 className="font-semibold text-orange-800 mb-2">Coverage Improvements</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Edge case detection</li>
                    <li>• Cross-browser testing</li>
                    <li>• Performance monitoring</li>
                    <li>• Visual regression testing</li>
                  </ul>
                </div>
              </div>
              <Textarea
                placeholder="Analyze how AI-powered testing tools improve test coverage, reduce manual effort, and enhance test reliability compared to traditional manual testing approaches..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Complete Task 2
        </Button>
      </div>
    </div>
  );
};

export default AutomatedTestingTask;
