
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  Eye,
  Brain,
  Target,
  Download,
  RefreshCw,
  Users,
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface CodeQualityMetric {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  details: string;
  severity: 'high' | 'medium' | 'low';
}

interface PerformanceIndicator {
  category: string;
  score: number;
  description: string;
  timestamp: string;
}

interface PlagiarismResult {
  similarity: number;
  confidence: 'high' | 'medium' | 'low';
  flaggedSections: Array<{
    startLine: number;
    endLine: number;
    reason: string;
    similarTo: string;
  }>;
}

interface BehaviorInsight {
  timestamp: string;
  action: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export const AIAnalysisPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for comprehensive analysis
  const overallMetrics = {
    overallScore: 78,
    technicalSkills: 85,
    communication: 72,
    problemSolving: 80,
    codeQuality: 75,
    timeManagement: 68,
    stressHandling: 83
  };

  const codeQualityMetrics: CodeQualityMetric[] = [
    { name: 'Code Complexity', score: 82, trend: 'up', details: 'Cyclomatic complexity: 3.2/10', severity: 'low' },
    { name: 'Best Practices', score: 88, trend: 'up', details: '9/10 practices followed', severity: 'low' },
    { name: 'Performance', score: 76, trend: 'stable', details: 'O(n log n) complexity achieved', severity: 'medium' },
    { name: 'Security', score: 92, trend: 'up', details: 'No vulnerabilities detected', severity: 'low' },
    { name: 'Readability', score: 79, trend: 'down', details: 'Good naming conventions', severity: 'medium' },
    { name: 'Test Coverage', score: 65, trend: 'down', details: '65% code coverage', severity: 'high' }
  ];

  const performanceData = [
    { time: '10:00', score: 45, codeQuality: 50, communication: 40 },
    { time: '10:15', score: 62, codeQuality: 65, communication: 58 },
    { time: '10:30', score: 74, codeQuality: 78, communication: 70 },
    { time: '10:45', score: 78, codeQuality: 82, communication: 72 },
    { time: '11:00', score: 78, codeQuality: 75, communication: 72 }
  ];

  const radarData = [
    { subject: 'Technical Skills', A: 85, fullMark: 100 },
    { subject: 'Problem Solving', A: 80, fullMark: 100 },
    { subject: 'Communication', A: 72, fullMark: 100 },
    { subject: 'Code Quality', A: 75, fullMark: 100 },
    { subject: 'Time Management', A: 68, fullMark: 100 },
    { subject: 'Stress Handling', A: 83, fullMark: 100 }
  ];

  const plagiarismResult: PlagiarismResult = {
    similarity: 23,
    confidence: 'low',
    flaggedSections: [
      {
        startLine: 15,
        endLine: 18,
        reason: 'Similar algorithm structure',
        similarTo: 'LeetCode Solution #1247'
      },
      {
        startLine: 34,
        endLine: 36,
        reason: 'Common helper function pattern',
        similarTo: 'GeeksforGeeks Template'
      }
    ]
  };

  const behaviorInsights: BehaviorInsight[] = [
    {
      timestamp: '10:32',
      action: 'Started coding immediately',
      impact: 'positive',
      description: 'Shows confidence and understanding of the problem'
    },
    {
      timestamp: '10:38',
      action: 'Explained approach clearly',
      impact: 'positive',
      description: 'Good communication skills demonstrated'
    },
    {
      timestamp: '10:45',
      action: 'Struggled with edge cases',
      impact: 'negative',
      description: 'Took 7 minutes to identify boundary conditions'
    },
    {
      timestamp: '10:52',
      action: 'Asked clarifying questions',
      impact: 'positive',
      description: 'Shows attention to detail and thoroughness'
    }
  ];

  const strengthsWeaknesses = {
    strengths: [
      'Strong understanding of data structures and algorithms',
      'Clean and readable code structure',
      'Good problem-solving approach',
      'Effective communication during explanation',
      'Quick to identify optimal solutions'
    ],
    weaknesses: [
      'Could improve test coverage',
      'Sometimes rushes through edge cases',
      'Limited consideration of scalability',
      'Needs to comment code more thoroughly'
    ],
    recommendations: [
      'Practice writing unit tests for better coverage',
      'Spend more time on edge case analysis',
      'Consider scalability implications early',
      'Add more detailed code comments'
    ]
  };

  const pieData = [
    { name: 'Correct Solutions', value: 78, color: '#39d353' },
    { name: 'Partial Solutions', value: 15, color: '#ffa500' },
    { name: 'Incorrect', value: 7, color: '#ff4444' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-tech-green';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-tech-green/20';
    if (score >= 60) return 'bg-yellow-400/20';
    return 'bg-red-400/20';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-tech-green" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      default: return <div className="w-3 h-3 bg-yellow-400 rounded-full" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-400/10';
      case 'medium': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-tech-green bg-tech-green/10';
    }
  };

  const refreshAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setLastUpdate(new Date());
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-tech-green" />
          <h3 className="text-white font-medium">AI Analysis</h3>
          <Badge variant="outline" className="text-tech-green border-tech-green">
            Live
          </Badge>
          {isAnalyzing && (
            <RefreshCw className="w-4 h-4 text-tech-green animate-spin" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refreshAnalysis}
            className="text-text-secondary hover:text-white h-8 w-8"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Analysis Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="bg-dark-primary border-border-dark mb-4 grid grid-cols-5 w-full">
            <TabsTrigger 
              value="overview" 
              className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20 text-xs"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="quality" 
              className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20 text-xs"
            >
              Code Quality
            </TabsTrigger>
            <TabsTrigger 
              value="performance" 
              className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20 text-xs"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="plagiarism" 
              className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20 text-xs"
            >
              Plagiarism
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20 text-xs"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Overall Score */}
              <div className="text-center p-6 bg-dark-primary rounded-lg border border-border-dark">
                <div className="text-4xl font-bold text-tech-green mb-2">
                  {overallMetrics.overallScore}
                </div>
                <div className="text-text-secondary">Overall Interview Score</div>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse"></div>
                    <span className="text-tech-green text-sm">Analyzing in real-time</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(overallMetrics).slice(1).map(([key, value]) => (
                  <div key={key} className="p-4 bg-dark-primary rounded-lg border border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-text-secondary text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className={`font-semibold ${getScoreColor(value)}`}>
                        {value}%
                      </span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Performance Radar Chart */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4">Skill Assessment Radar</h4>
                <div className="h-64">
                  <ChartContainer
                    config={{
                      A: { label: "Score", color: "#39d353" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fill: '#9ca3af', fontSize: 10 }}
                        />
                        <Radar
                          name="Skills"
                          dataKey="A"
                          stroke="#39d353"
                          fill="#39d353"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              {/* Real-time Updates */}
              <div className="bg-dark-primary p-4 rounded-lg border border-border-dark">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Live Analysis</span>
                  </div>
                  <span className="text-text-secondary text-xs">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">
                  Candidate is demonstrating strong problem-solving skills. Current solution approach 
                  shows good understanding of algorithmic complexity. Monitoring for optimization opportunities.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-6 mt-0">
              {/* Code Quality Metrics */}
              <div className="space-y-4">
                <h4 className="text-white font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Code Quality Analysis
                </h4>
                {codeQualityMetrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${getSeverityColor(metric.severity)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getScoreColor(metric.score)}`}>
                          {metric.score}%
                        </span>
                        {metric.severity === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                    <Progress value={metric.score} className="mb-2 h-2" />
                    <p className="text-text-secondary text-sm">{metric.details}</p>
                  </div>
                ))}
              </div>

              {/* Code Complexity Chart */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4">Code Complexity Over Time</h4>
                <div className="h-48">
                  <ChartContainer
                    config={{
                      complexity: { label: "Complexity", color: "#39d353" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <XAxis dataKey="time" stroke="#8b949e" />
                        <YAxis stroke="#8b949e" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="codeQuality" 
                          stroke="#39d353" 
                          fill="#39d353" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6 mt-0">
              {/* Performance Trends */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Trends
                </h4>
                <div className="h-64">
                  <ChartContainer
                    config={{
                      score: { label: "Overall Score", color: "#39d353" },
                      codeQuality: { label: "Code Quality", color: "#3b82f6" },
                      communication: { label: "Communication", color: "#f59e0b" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="time" stroke="#8b949e" />
                        <YAxis stroke="#8b949e" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="score" stroke="#39d353" strokeWidth={2} />
                        <Line type="monotone" dataKey="codeQuality" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="communication" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              {/* Solution Distribution */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4 flex items-center">
                  <PieChart className="w-4 h-4 mr-2" />
                  Solution Accuracy Distribution
                </h4>
                <div className="h-48">
                  <ChartContainer
                    config={{
                      value: { label: "Percentage", color: "#39d353" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={pieData}>
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-text-secondary text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Management Analysis */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-primary p-4 rounded-lg border border-border-dark">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-tech-green" />
                    <span className="text-white font-medium">Time Efficiency</span>
                  </div>
                  <div className="text-2xl font-bold text-tech-green mb-1">68%</div>
                  <p className="text-text-secondary text-sm">
                    Completed 68% within time limit
                  </p>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg border border-border-dark">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">Accuracy Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">85%</div>
                  <p className="text-text-secondary text-sm">
                    High accuracy in first attempts
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plagiarism" className="space-y-6 mt-0">
              {/* Plagiarism Overview */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Plagiarism Detection
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`${
                      plagiarismResult.confidence === 'low' 
                        ? 'border-tech-green text-tech-green' 
                        : plagiarismResult.confidence === 'medium'
                        ? 'border-yellow-400 text-yellow-400'
                        : 'border-red-400 text-red-400'
                    }`}
                  >
                    {plagiarismResult.confidence} confidence
                  </Badge>
                </div>
                
                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold mb-2 ${
                    plagiarismResult.similarity < 30 
                      ? 'text-tech-green' 
                      : plagiarismResult.similarity < 60 
                      ? 'text-yellow-400' 
                      : 'text-red-400'
                  }`}>
                    {plagiarismResult.similarity}%
                  </div>
                  <div className="text-text-secondary">Similarity Score</div>
                  <Progress value={plagiarismResult.similarity} className="mt-4" />
                </div>

                <div className="space-y-3">
                  <h5 className="text-white font-medium">Flagged Sections</h5>
                  {plagiarismResult.flaggedSections.map((section, index) => (
                    <div key={index} className="p-3 bg-dark-secondary rounded border border-yellow-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400 font-medium">
                          Lines {section.startLine}-{section.endLine}
                        </span>
                        <Eye className="w-4 h-4 text-text-secondary" />
                      </div>
                      <p className="text-text-secondary text-sm mb-1">{section.reason}</p>
                      <p className="text-text-secondary text-xs">Similar to: {section.similarTo}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4">Analysis Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-tech-green" />
                    <span className="text-text-secondary">
                      Original problem-solving approach detected
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-tech-green" />
                    <span className="text-text-secondary">
                      Unique variable naming and structure
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-text-secondary">
                      Some common algorithmic patterns found
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-tech-green" />
                    <span className="text-text-secondary">
                      No direct code copying detected
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-tech-green/10 border border-tech-green/30 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-tech-green" />
                    <span className="text-tech-green font-medium">Recommendation</span>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Low plagiarism risk. Similarities found are common algorithmic patterns 
                    and not indicative of cheating. Candidate shows original thinking.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-0">
              {/* Behavior Timeline */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Behavior Timeline
                </h4>
                <div className="space-y-3">
                  {behaviorInsights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16 text-xs text-text-secondary mt-1">
                        {insight.timestamp}
                      </div>
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${
                        insight.impact === 'positive' ? 'bg-tech-green' :
                        insight.impact === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{insight.action}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              insight.impact === 'positive' ? 'border-tech-green text-tech-green' :
                              insight.impact === 'negative' ? 'border-red-400 text-red-400' : 
                              'border-yellow-400 text-yellow-400'
                            }`}
                          >
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-text-secondary text-sm">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                  <h4 className="text-tech-green font-medium mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {strengthsWeaknesses.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-tech-green rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                  <h4 className="text-yellow-400 font-medium mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {strengthsWeaknesses.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hiring Recommendation */}
              <div className="bg-dark-primary rounded-lg border border-border-dark p-4">
                <h4 className="text-white font-medium mb-4 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Hiring Recommendation
                </h4>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-tech-green/10 border border-tech-green/30 rounded">
                    <div className="text-2xl font-bold text-tech-green mb-1">Strong Hire</div>
                    <div className="text-text-secondary text-sm">Recommendation</div>
                  </div>
                  <div className="text-center p-3 bg-dark-secondary border border-border-dark rounded">
                    <div className="text-2xl font-bold text-white mb-1">78%</div>
                    <div className="text-text-secondary text-sm">Match Score</div>
                  </div>
                  <div className="text-center p-3 bg-dark-secondary border border-border-dark rounded">
                    <div className="text-2xl font-bold text-white mb-1">Top 15%</div>
                    <div className="text-text-secondary text-sm">Ranking</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">Key Recommendations</h5>
                    <ul className="space-y-2">
                      {strengthsWeaknesses.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-text-secondary text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-tech-green/10 border border-tech-green/30 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-tech-green" />
                      <span className="text-tech-green font-medium">Final Assessment</span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Candidate demonstrates strong technical skills with good problem-solving abilities. 
                      Shows potential for growth and would be a valuable addition to the team. 
                      Recommend proceeding to next interview round.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </Card>
  );
};
