import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Play, Square, Timer, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { CodeExecutor, ExecutionResult, TestResult } from './CodeExecutor';
import { TestCaseManager } from './TestCaseManager';
import { ExecutionHistory } from './ExecutionHistory';

interface ExecutionPanelProps {
  language: string;
  code: string;
  isVisible: boolean;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  language,
  code,
  isVisible
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState('console');
  const [executionProgress, setExecutionProgress] = useState(0);

  const executor = CodeExecutor.getInstance();

  useEffect(() => {
    // Initialize Pyodide when component mounts
    if (language === 'python') {
      executor.initializePyodide();
    }
  }, [language]);

  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setExecutionProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setExecutionProgress(prev => Math.min(prev + 10, 90));
    }, 100);

    try {
      const result = await executor.executeCode(language, code);
      setExecutionResult(result);
      setActiveTab('console');
    } catch (error) {
      setExecutionResult({
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: 0
      });
    } finally {
      clearInterval(progressInterval);
      setExecutionProgress(100);
      setIsExecuting(false);
      
      // Reset progress after a short delay
      setTimeout(() => setExecutionProgress(0), 1000);
    }
  };

  const handleRunTests = async (testCases: any[]) => {
    if (isExecuting || testCases.length === 0) return;

    setIsExecuting(true);
    setExecutionProgress(0);

    try {
      const results = await executor.runTestCases(language, code, testCases);
      setTestResults(results);
      setActiveTab('tests');
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsExecuting(false);
      setExecutionProgress(0);
    }
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionProgress(0);
    // Note: Actual termination would require more complex implementation
  };

  const handleClearOutput = () => {
    setExecutionResult(null);
    setTestResults([]);
  };

  if (!isVisible) return null;

  const passedTests = testResults.filter(result => result.passed).length;
  const totalTests = testResults.length;

  return (
    <Card className="h-full bg-dark-secondary border-border-dark">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-medium">Execution Results</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleRunCode}
              disabled={isExecuting}
              className="h-7 px-3 bg-tech-green hover:bg-tech-green/80"
            >
              <Play className="w-3 h-3 mr-1" />
              Run
            </Button>
            {isExecuting && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleStopExecution}
                className="h-7 px-3 border-red-500 text-red-500 hover:bg-red-500/10"
              >
                <Square className="w-3 h-3 mr-1" />
                Stop
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearOutput}
              className="h-7 px-3 border-border-dark text-text-secondary hover:bg-dark-primary"
            >
              Clear
            </Button>
          </div>
        </div>
        
        {isExecuting && (
          <div className="mt-2">
            <Progress value={executionProgress} className="h-1" />
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 bg-dark-primary border-b border-border-dark rounded-none">
            <TabsTrigger value="console" className="text-xs">
              <Terminal className="w-3 h-3 mr-1" />
              Console
            </TabsTrigger>
            <TabsTrigger value="tests" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Tests {totalTests > 0 && `(${passedTests}/${totalTests})`}
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              <Timer className="w-3 h-3 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="test-editor" className="text-xs">
              Edit Tests
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="console" className="h-full m-0 p-4">
              <ScrollArea className="h-full">
                {executionResult ? (
                  <div className="space-y-4">
                    {/* Execution Status */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={executionResult.success ? "default" : "destructive"}>
                        {executionResult.success ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {executionResult.success ? 'Success' : 'Error'}
                      </Badge>
                      <span className="text-text-secondary text-xs">
                        {executionResult.executionTime.toFixed(2)}ms
                      </span>
                    </div>

                    {/* Output */}
                    {executionResult.output && (
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Output:</h4>
                        <pre className="bg-dark-primary p-3 rounded text-sm text-gray-300 whitespace-pre-wrap border border-border-dark">
                          {executionResult.output}
                        </pre>
                      </div>
                    )}

                    {/* Error */}
                    {executionResult.error && (
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-2">Error:</h4>
                        <pre className="bg-red-950/20 p-3 rounded text-sm text-red-300 whitespace-pre-wrap border border-red-500/20">
                          {executionResult.error}
                        </pre>
                      </div>
                    )}

                    {/* Stack Trace */}
                    {executionResult.stackTrace && (
                      <div>
                        <h4 className="text-sm font-medium text-yellow-400 mb-2">Stack Trace:</h4>
                        <pre className="bg-yellow-950/20 p-3 rounded text-xs text-yellow-300 whitespace-pre-wrap border border-yellow-500/20">
                          {executionResult.stackTrace}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-text-secondary">
                    Click "Run" to execute your code
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tests" className="h-full m-0 p-4">
              <ScrollArea className="h-full">
                {testResults.length > 0 ? (
                  <div className="space-y-4">
                    {/* Test Summary */}
                    <div className="flex items-center gap-4 p-3 bg-dark-primary rounded border border-border-dark">
                      <div className="flex items-center gap-2">
                        <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
                          {passedTests}/{totalTests} Passed
                        </Badge>
                        <span className="text-text-secondary text-sm">
                          {((passedTests / totalTests) * 100).toFixed(0)}% Success Rate
                        </span>
                      </div>
                    </div>

                    {/* Individual Test Results */}
                    {testResults.map((result, index) => (
                      <div key={index} className="border border-border-dark rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-white">
                            {result.testCase.name || `Test Case ${index + 1}`}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={result.passed ? "default" : "destructive"}>
                              {result.passed ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              {result.passed ? 'Pass' : 'Fail'}
                            </Badge>
                            <span className="text-text-secondary text-xs">
                              {result.executionTime.toFixed(2)}ms
                            </span>
                          </div>
                        </div>

                        {result.testCase.description && (
                          <p className="text-text-secondary text-sm mb-3">
                            {result.testCase.description}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <h5 className="text-white font-medium mb-1">Expected:</h5>
                            <pre className="bg-dark-primary p-2 rounded text-gray-300 whitespace-pre-wrap">
                              {result.testCase.expectedOutput}
                            </pre>
                          </div>
                          <div>
                            <h5 className="text-white font-medium mb-1">Actual:</h5>
                            <pre className={`p-2 rounded whitespace-pre-wrap ${
                              result.passed 
                                ? 'bg-green-950/20 text-green-300' 
                                : 'bg-red-950/20 text-red-300'
                            }`}>
                              {result.actualOutput}
                            </pre>
                          </div>
                        </div>

                        {result.error && (
                          <div className="mt-3">
                            <h5 className="text-red-400 font-medium mb-1 text-xs">Error:</h5>
                            <pre className="bg-red-950/20 p-2 rounded text-xs text-red-300 whitespace-pre-wrap">
                              {result.error}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-text-secondary">
                    No test results yet. Create test cases and run them.
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="history" className="h-full m-0">
              <ExecutionHistory />
            </TabsContent>

            <TabsContent value="test-editor" className="h-full m-0">
              <TestCaseManager onRunTests={handleRunTests} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
