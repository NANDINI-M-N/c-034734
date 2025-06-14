
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Settings, TrendingUp } from 'lucide-react';

export const AIAnalysisPanel = () => {
  const analysisData = {
    overallScore: 78,
    technicalSkills: 85,
    communication: 72,
    problemSolving: 80,
    codeQuality: 75,
    insights: [
      { type: 'positive', text: 'Strong understanding of data structures' },
      { type: 'neutral', text: 'Good communication skills, explains thought process well' },
      { type: 'improvement', text: 'Could optimize time complexity in solution' },
      { type: 'positive', text: 'Clean and readable code structure' },
    ],
    keywords: ['React', 'JavaScript', 'Algorithm', 'Data Structure', 'Problem Solving'],
    sentiment: 'positive'
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-900/20 text-green-400 border-green-400';
      case 'improvement': return 'bg-yellow-900/20 text-yellow-400 border-yellow-400';
      default: return 'bg-blue-900/20 text-blue-400 border-blue-400';
    }
  };

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <div className="flex items-center space-x-2">
          <h3 className="text-white font-medium">AI Analysis</h3>
          <Badge variant="outline" className="text-tech-green border-tech-green">
            Live
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Analysis Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-tech-green" />
              <span className="text-white font-medium">Overall Score</span>
            </div>
            <div className="flex items-center space-x-4">
              <Progress value={analysisData.overallScore} className="flex-1" />
              <span className="text-tech-green font-semibold text-lg">{analysisData.overallScore}%</span>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Skill Assessment</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Technical Skills</span>
                  <span className="text-white">{analysisData.technicalSkills}%</span>
                </div>
                <Progress value={analysisData.technicalSkills} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Communication</span>
                  <span className="text-white">{analysisData.communication}%</span>
                </div>
                <Progress value={analysisData.communication} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Problem Solving</span>
                  <span className="text-white">{analysisData.problemSolving}%</span>
                </div>
                <Progress value={analysisData.problemSolving} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Code Quality</span>
                  <span className="text-white">{analysisData.codeQuality}%</span>
                </div>
                <Progress value={analysisData.codeQuality} />
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Key Insights</h4>
            <div className="space-y-2">
              {analysisData.insights.map((insight, index) => (
                <div 
                  key={index}
                  className={`text-sm p-3 rounded border ${getInsightColor(insight.type)}`}
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Detected Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysisData.keywords.map((keyword, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-tech-green border-tech-green/50 bg-tech-green/10"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Real-time Updates */}
          <div className="bg-dark-primary p-3 rounded border border-border-dark">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Live Analysis</span>
            </div>
            <p className="text-text-secondary text-sm">
              Candidate is actively working on the problem. Good approach to breaking down the solution into smaller steps.
            </p>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
