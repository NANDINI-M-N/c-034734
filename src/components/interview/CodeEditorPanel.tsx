
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Settings, Copy } from 'lucide-react';

export const CodeEditorPanel = () => {
  const [language, setLanguage] = React.useState('javascript');
  const [code, setCode] = React.useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code here
    
}`);

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <h3 className="text-white font-medium">Code Editor</h3>
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 bg-dark-primary border-border-dark text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-primary border-border-dark">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 p-4">
        <div className="h-full bg-dark-primary rounded border border-border-dark">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
            placeholder="Start coding..."
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        </div>
      </div>

      {/* Editor Controls */}
      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-tech-green hover:bg-tech-green/80 text-dark-primary">
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
            <Button variant="outline" size="sm" className="border-border-dark text-text-secondary hover:text-white">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="text-text-secondary text-sm">
            Line 4, Column 12
          </div>
        </div>
      </div>
    </Card>
  );
};
