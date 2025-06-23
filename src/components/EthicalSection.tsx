
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
  const [reflection, setReflection] = useState({
    biases: "The Kaggle Breast Cancer Dataset may contain several potential biases: 1) Demographic bias - The dataset primarily represents certain geographic regions and healthcare systems, potentially underrepresenting diverse populations. 2) Socioeconomic bias - Patients with better healthcare access are more likely to be included, skewing toward higher-income demographics. 3) Institutional bias - Data collection methods may vary across healthcare facilities, creating systematic differences. 4) Temporal bias - Medical practices and diagnostic criteria evolve over time, making older data potentially less relevant. 5) Selection bias - Patients who seek medical attention may differ systematically from those who don't, affecting the representativeness of the dataset.",
    fairnessTools: "IBM AI Fairness 360 can address these biases through several mechanisms: 1) Bias Detection - The toolkit can measure multiple fairness metrics (equalized odds, demographic parity, individual fairness) to identify where discrimination occurs. 2) Pre-processing - Techniques like reweighing can adjust training data to reduce bias before model training. 3) In-processing - Fair learning algorithms can optimize for both accuracy and fairness simultaneously during model training. 4) Post-processing - Methods like calibrated equalized odds can adjust model outputs to ensure fair treatment across groups. 5) Monitoring - Continuous bias monitoring in production helps detect fairness drift over time. Implementation would involve integrating fairness metrics into the model evaluation pipeline and establishing fairness thresholds alongside accuracy requirements.",
    companyImpact: "Deploying this predictive model in a company setting raises several ethical considerations: 1) Transparency - Employees should understand how AI influences resource allocation decisions affecting their work. 2) Accountability - Clear governance structures must define who is responsible for AI-driven decisions. 3) Privacy - Employee data used for predictions must be handled with appropriate privacy protections. 4) Fairness - The model should not systematically disadvantage certain teams or individuals. 5) Human oversight - Critical decisions should maintain human review and override capabilities. Companies should establish AI ethics committees, conduct regular audits, and provide channels for addressing concerns about AI-driven resource allocation."
  });

  const handleReflectionChange = (field: string, value: string) => {
    setReflection(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const allSectionsComplete = Object.values(reflection).every(section => section.trim().length > 100);
    if (allSectionsComplete) {
      toast({
        title: "Ethical Reflection Completed!",
        description: "Your ethical analysis demonstrates thoughtful consideration of AI bias and fairness.",
      });
      onComplete();
    } else {
      toast({
        title: "Incomplete Reflection",
        description: "Please provide detailed responses (minimum 100 characters each).",
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
            Ethical Reflection (10%)
          </CardTitle>
          <CardDescription>
            Analyze the ethical implications of deploying your predictive model in a real-world company environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">Bias Analysis</Badge>
            <Badge variant="outline">Fairness Tools</Badge>
            <Badge variant="outline">Corporate Ethics</Badge>
            <Badge variant="outline">AI Governance</Badge>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Context:</strong> Your predictive model from Task 3 is deployed in a company for resource allocation decisions. 
              Consider the broader implications of AI in workplace decision-making.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Dataset Bias Analysis
          </CardTitle>
          <CardDescription>
            Identify potential biases in the Kaggle Breast Cancer Dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border">
              <h4 className="font-semibold text-red-800 mb-2">Common Dataset Biases</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Demographic underrepresentation</li>
                <li>• Geographic sampling limitations</li>
                <li>• Socioeconomic access barriers</li>
                <li>• Temporal data inconsistencies</li>
                <li>• Selection and survival biases</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border">
              <h4 className="font-semibold text-orange-800 mb-2">Impact on Teams</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Underrepresented teams disadvantaged</li>
                <li>• Skewed resource allocation</li>
                <li>• Perpetuation of existing inequalities</li>
                <li>• Reduced trust in AI systems</li>
                <li>• Legal and compliance risks</li>
              </ul>
            </div>
          </div>
          <Textarea
            placeholder="Analyze potential biases in the dataset, such as underrepresented demographic groups, geographic limitations, or systemic healthcare access issues..."
            value={reflection.biases}
            onChange={(e) => handleReflectionChange("biases", e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            Fairness Tool Implementation
          </CardTitle>
          <CardDescription>
            How IBM AI Fairness 360 could address identified biases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-semibold text-blue-800 mb-2">IBM AI Fairness 360 Capabilities</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div>
                <p><strong>Detection:</strong> Bias metrics & monitoring</p>
                <p><strong>Mitigation:</strong> Pre/in/post-processing</p>
              </div>
              <div>
                <p><strong>Metrics:</strong> Demographic parity, equalized odds</p>
                <p><strong>Algorithms:</strong> Reweighing, adversarial debiasing</p>
              </div>
              <div>
                <p><strong>Monitoring:</strong> Continuous fairness tracking</p>
                <p><strong>Explanation:</strong> Model interpretability tools</p>
              </div>
            </div>
          </div>
          <Textarea
            placeholder="Explain how specific features of IBM AI Fairness 360 (bias detection, mitigation algorithms, fairness metrics) could be implemented to address the biases you identified..."
            value={reflection.fairnessTools}
            onChange={(e) => handleReflectionChange("fairnessTools", e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Corporate Deployment Ethics
          </CardTitle>
          <CardDescription>
            Ethical considerations for company-wide AI deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border">
              <h4 className="font-semibold text-green-800 mb-2">Ethical Principles</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Transparency in AI decision-making</li>
                <li>• Accountability and governance</li>
                <li>• Privacy protection and consent</li>
                <li>• Fair treatment and equal opportunity</li>
                <li>• Human oversight and control</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border">
              <h4 className="font-semibold text-purple-800 mb-2">Implementation Strategies</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• AI ethics committees</li>
                <li>• Regular bias audits</li>
                <li>• Employee training programs</li>
                <li>• Feedback and appeal processes</li>
                <li>• Continuous monitoring systems</li>
              </ul>
            </div>
          </div>
          <Textarea
            placeholder="Discuss the broader ethical implications of deploying AI for resource allocation in a company, including employee trust, governance structures, and long-term organizational impact..."
            value={reflection.companyImpact}
            onChange={(e) => handleReflectionChange("companyImpact", e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Complete Ethical Reflection
        </Button>
      </div>
    </div>
  );
};

export default EthicalSection;
