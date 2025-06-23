
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Database, TrendingUp, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PredictiveAnalyticsTaskProps {
  onComplete: () => void;
}

const PredictiveAnalyticsTask = ({ onComplete }: PredictiveAnalyticsTaskProps) => {
  const [dataPreprocessing, setDataPreprocessing] = useState("");
  const [modelCode, setModelCode] = useState("");
  const [metrics, setMetrics] = useState({
    accuracy: "",
    f1Score: "",
    precision: "",
    recall: ""
  });
  const [evaluation, setEvaluation] = useState("");

  const samplePreprocessing = `# Data Preprocessing Example
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load dataset
df = pd.read_csv('breast_cancer_dataset.csv')

# Clean data
df = df.dropna()  # Remove missing values
df = df.drop_duplicates()  # Remove duplicates

# Feature engineering
le = LabelEncoder()
df['priority'] = le.fit_transform(df['diagnosis'])  # Convert to numeric

# Split features and target
X = df.drop(['priority', 'id'], axis=1)
y = df['priority']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`;

  const sampleModelCode = `# Random Forest Model Training
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, classification_report

# Initialize model
rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    max_depth=10
)

# Train model
rf_model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = rf_model.predict(X_test_scaled)

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred, average='weighted')

print(f"Accuracy: {accuracy:.3f}")
print(f"F1-Score: {f1:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))`;

  const handleMetricChange = (field: string, value: string) => {
    setMetrics(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const allFieldsFilled = dataPreprocessing.trim() && 
                           modelCode.trim() &&
                           Object.values(metrics).every(val => val.trim()) &&
                           evaluation.trim();
    
    if (allFieldsFilled) {
      toast({
        title: "Task 3 Completed!",
        description: "Predictive analytics implementation has been documented.",
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

  // Calculate average performance for visualization
  const avgAccuracy = metrics.accuracy ? parseFloat(metrics.accuracy) : 0;
  const avgF1 = metrics.f1Score ? parseFloat(metrics.f1Score) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Task 3: Predictive Analytics for Resource Allocation
          </CardTitle>
          <CardDescription>
            Build a machine learning model to predict issue priority using the Kaggle Breast Cancer Dataset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">Random Forest</Badge>
            <Badge variant="outline">Scikit-learn</Badge>
            <Badge variant="outline">Kaggle Dataset</Badge>
            <Badge variant="outline">Priority Prediction</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Objective:</strong> Preprocess data, train a Random Forest model, and evaluate performance 
            using accuracy and F1-score metrics.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="preprocessing" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preprocessing" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Preprocessing
          </TabsTrigger>
          <TabsTrigger value="model" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Model
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Evaluation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preprocessing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Data Preprocessing
              </CardTitle>
              <CardDescription>
                Document your data cleaning, labeling, and splitting process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Example Preprocessing Code:</h4>
                <pre className="text-xs overflow-x-auto">{samplePreprocessing}</pre>
              </div>
              <Textarea
                placeholder="Paste your data preprocessing code here (cleaning, labeling, train/test split)..."
                value={dataPreprocessing}
                onChange={(e) => setDataPreprocessing(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                Model Training
              </CardTitle>
              <CardDescription>
                Document your Random Forest model implementation and training process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Example Model Training Code:</h4>
                <pre className="text-xs overflow-x-auto">{sampleModelCode}</pre>
              </div>
              <Textarea
                placeholder="Paste your model training code here (Random Forest implementation, training, predictions)..."
                value={modelCode}
                onChange={(e) => setModelCode(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                Enter your model's performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accuracy">Accuracy Score</Label>
                  <Input
                    id="accuracy"
                    placeholder="e.g., 0.95"
                    value={metrics.accuracy}
                    onChange={(e) => handleMetricChange("accuracy", e.target.value)}
                  />
                  {avgAccuracy > 0 && (
                    <Progress value={avgAccuracy * 100} className="mt-2" />
                  )}
                </div>
                <div>
                  <Label htmlFor="f1Score">F1-Score</Label>
                  <Input
                    id="f1Score"
                    placeholder="e.g., 0.92"
                    value={metrics.f1Score}
                    onChange={(e) => handleMetricChange("f1Score", e.target.value)}
                  />
                  {avgF1 > 0 && (
                    <Progress value={avgF1 * 100} className="mt-2" />
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="precision">Precision</Label>
                  <Input
                    id="precision"
                    placeholder="e.g., 0.93"
                    value={metrics.precision}
                    onChange={(e) => handleMetricChange("precision", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="recall">Recall</Label>
                  <Input
                    id="recall"
                    placeholder="e.g., 0.91"
                    value={metrics.recall}
                    onChange={(e) => handleMetricChange("recall", e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border">
                <h4 className="font-semibold text-green-800 mb-2">Performance Interpretation</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                  <div>
                    <p><strong>Accuracy:</strong> Overall correctness</p>
                    <p><strong>Precision:</strong> True positives / (True positives + False positives)</p>
                  </div>
                  <div>
                    <p><strong>Recall:</strong> True positives / (True positives + False negatives)</p>
                    <p><strong>F1-Score:</strong> Harmonic mean of precision and recall</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                Model Evaluation & Insights
              </CardTitle>
              <CardDescription>
                Analyze your model's performance and provide insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border text-center">
                  <BarChart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Model Performance</h4>
                  <p className="text-sm text-blue-700">Accuracy: {metrics.accuracy || 'N/A'}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-green-800">F1-Score</h4>
                  <p className="text-sm text-green-700">{metrics.f1Score || 'N/A'}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold text-purple-800">Deployment Ready</h4>
                  <p className="text-sm text-purple-700">
                    {avgAccuracy > 0.8 ? 'Yes' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
              <Textarea
                placeholder="Analyze your model's performance. Discuss the accuracy and F1-score results, potential improvements, feature importance, and readiness for deployment in a real-world scenario..."
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Complete Task 3
        </Button>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsTask;
