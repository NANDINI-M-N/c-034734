
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Settings, 
  Copy, 
  RotateCcw, 
  Save, 
  Maximize, 
  Sun, 
  Moon,
  Plus,
  Minus,
  Clock,
  Memory,
  CheckCircle,
  XCircle,
  Users,
  History
} from 'lucide-react';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status: 'pending' | 'passed' | 'failed';
  runtime?: number;
}

export const CodeEditorPanel = () => {
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const editorRef = useRef<any>(null);

  const [code, setCode] = useState(`// Two Sum Problem
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`);

  const [executionResult, setExecutionResult] = useState({
    output: '',
    runtime: 0,
    memory: 0,
    status: 'idle' as 'idle' | 'running' | 'success' | 'error'
  });

  const [testCases] = useState<TestCase[]>([
    {
      id: '1',
      input: 'nums = [2,7,11,15], target = 9',
      expectedOutput: '[0,1]',
      actualOutput: '[0,1]',
      status: 'passed',
      runtime: 1
    },
    {
      id: '2',
      input: 'nums = [3,2,4], target = 6',
      expectedOutput: '[1,2]',
      actualOutput: '[1,2]',
      status: 'passed',
      runtime: 1
    },
    {
      id: '3',
      input: 'nums = [3,3], target = 6',
      expectedOutput: '[0,1]',
      actualOutput: '[0,1]',
      status: 'passed',
      runtime: 0
    }
  ]);

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'typescript', label: 'TypeScript', icon: '🔷' },
    { value: 'go', label: 'Go', icon: '🐹' }
  ];

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setShowOutput(true);
    setExecutionResult(prev => ({ ...prev, status: 'running' }));

    // Simulate code execution
    setTimeout(() => {
      setExecutionResult({
        output: 'Output:\n[0,1]\n[1,2]\n[0,1]\n\nAll test cases passed!',
        runtime: Math.floor(Math.random() * 100) + 50,
        memory: Math.floor(Math.random() * 20) + 10,
        status: 'success'
      });
      setIsExecuting(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleResetCode = () => {
    const templates = {
      javascript: `// Your solution here
function twoSum(nums, target) {
    // Write your code here
    
}`,
      python: `# Your solution here
def twoSum(nums, target):
    # Write your code here
    pass`,
      java: `// Your solution here
public int[] twoSum(int[] nums, int target) {
    // Write your code here
    
}`,
      cpp: `// Your solution here
vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    
}`
    };
    setCode(templates[language as keyof typeof templates] || templates.javascript);
  };

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <div className="flex items-center space-x-4">
          <h3 className="text-white font-medium">Code Editor</h3>
          {isCollaborative && (
            <Badge variant="outline" className="text-tech-green border-tech-green">
              <Users className="w-3 h-3 mr-1" />
              Collaborative
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-white h-8 w-8"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-white h-8 w-8"
            onClick={() => setIsCollaborative(!isCollaborative)}
          >
            <Users className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border-dark bg-dark-primary">
        <div className="flex items-center space-x-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40 bg-dark-secondary border-border-dark text-white h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-secondary border-border-dark">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-dark-primary">
                  <div className="flex items-center space-x-2">
                    <span>{lang.icon}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-6 bg-border-dark" />

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
            >
              {theme === 'vs-dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => setFontSize(Math.max(12, fontSize - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-text-secondary text-sm px-2">{fontSize}px</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border-dark text-text-secondary hover:text-white h-8"
            onClick={handleResetCode}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border-dark text-text-secondary hover:text-white h-8"
            onClick={handleCopyCode}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border-dark text-text-secondary hover:text-white h-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            size="sm"
            className="bg-tech-green hover:bg-tech-green/80 text-dark-primary h-8"
            onClick={handleRunCode}
            disabled={isExecuting}
          >
            <Play className="w-4 h-4 mr-2" />
            {isExecuting ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Code Editor */}
        <div className={`${showOutput ? 'h-3/5' : 'flex-1'} transition-all duration-300`}>
          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: 'on',
              folding: true,
              wordWrap: 'on',
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true }
            }}
          />
        </div>

        {/* Output Panel */}
        {showOutput && (
          <div className="h-2/5 border-t border-border-dark bg-dark-primary flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-border-dark">
              <div className="flex items-center space-x-4">
                <h4 className="text-white font-medium">Output</h4>
                {executionResult.status === 'success' && (
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-tech-green">
                      <Clock className="w-3 h-3" />
                      <span>{executionResult.runtime}ms</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-400">
                      <Memory className="w-3 h-3" />
                      <span>{executionResult.memory}MB</span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-white"
                onClick={() => setShowOutput(false)}
              >
                ✕
              </Button>
            </div>

            <div className="flex-1 flex">
              <div className="w-1/2 p-3">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-3">
                      {executionResult.status === 'running' && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      )}
                      {executionResult.status === 'success' && (
                        <CheckCircle className="w-4 h-4 text-tech-green" />
                      )}
                      {executionResult.status === 'error' && (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-white text-sm font-medium">
                        {executionResult.status === 'running' && 'Executing...'}
                        {executionResult.status === 'success' && 'Execution Successful'}
                        {executionResult.status === 'error' && 'Execution Failed'}
                        {executionResult.status === 'idle' && 'Ready to Execute'}
                      </span>
                    </div>
                    <pre className="text-text-secondary text-sm font-mono whitespace-pre-wrap">
                      {executionResult.output}
                    </pre>
                  </div>
                </ScrollArea>
              </div>

              <div className="w-1/2 border-l border-border-dark p-3">
                <h5 className="text-white font-medium mb-3">Test Cases</h5>
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {testCases.map((testCase) => (
                      <div key={testCase.id} className="bg-dark-secondary p-3 rounded border border-border-dark">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">Test Case {testCase.id}</span>
                          <div className="flex items-center space-x-2">
                            {testCase.status === 'passed' && (
                              <CheckCircle className="w-4 h-4 text-tech-green" />
                            )}
                            {testCase.status === 'failed' && (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            {testCase.runtime && (
                              <span className="text-text-secondary text-xs">{testCase.runtime}ms</span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div>
                            <span className="text-text-secondary">Input: </span>
                            <span className="text-white font-mono">{testCase.input}</span>
                          </div>
                          <div>
                            <span className="text-text-secondary">Expected: </span>
                            <span className="text-white font-mono">{testCase.expectedOutput}</span>
                          </div>
                          {testCase.actualOutput && (
                            <div>
                              <span className="text-text-secondary">Actual: </span>
                              <span className="text-white font-mono">{testCase.actualOutput}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
