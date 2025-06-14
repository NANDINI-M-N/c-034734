
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Clock, CheckCircle, Play } from 'lucide-react';

const SkillAssessments = () => {
  const assessments = [
    {
      id: 1,
      name: 'JavaScript Fundamentals',
      difficulty: 'Intermediate',
      duration: '45 min',
      status: 'completed',
      score: 85,
      maxScore: 100,
      completedDate: '2024-06-10',
      badgeEarned: 'JS Expert'
    },
    {
      id: 2,
      name: 'React Advanced Concepts',
      difficulty: 'Advanced',
      duration: '60 min',
      status: 'completed',
      score: 78,
      maxScore: 100,
      completedDate: '2024-06-08',
      badgeEarned: 'React Pro'
    },
    {
      id: 3,
      name: 'Data Structures & Algorithms',
      difficulty: 'Expert',
      duration: '90 min',
      status: 'available',
      score: 0,
      maxScore: 100,
      completedDate: null,
      badgeEarned: null
    },
    {
      id: 4,
      name: 'System Design Basics',
      difficulty: 'Advanced',
      duration: '75 min',
      status: 'locked',
      score: 0,
      maxScore: 100,
      completedDate: null,
      badgeEarned: null
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-orange-500';
      case 'Expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-tech-green';
      case 'available': return 'text-blue-500';
      case 'locked': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-tech-green';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="bg-dark-secondary border-border-dark">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary flex items-center gap-2">
          <Award className="h-5 w-5 text-tech-green" />
          Skill Assessments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="p-4 rounded-lg bg-dark-primary border border-border-dark">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-text-primary">{assessment.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getDifficultyColor(assessment.difficulty)} text-white text-xs`}>
                    {assessment.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock className="h-3 w-3" />
                    <span>{assessment.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {assessment.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-tech-green" />
                )}
                <span className={`text-sm font-medium ${getStatusColor(assessment.status)}`}>
                  {assessment.status === 'completed' ? 'Completed' : 
                   assessment.status === 'available' ? 'Available' : 'Locked'}
                </span>
              </div>
            </div>

            {assessment.status === 'completed' && (
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Score</span>
                  <span className={`font-bold ${getScoreColor(assessment.score)}`}>
                    {assessment.score}/{assessment.maxScore}
                  </span>
                </div>
                <Progress value={(assessment.score / assessment.maxScore) * 100} className="h-2" />
                {assessment.badgeEarned && (
                  <div className="flex items-center gap-2 mt-2">
                    <Award className="h-4 w-4 text-tech-green" />
                    <Badge className="bg-tech-green text-dark-primary text-xs">
                      {assessment.badgeEarned}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              {assessment.completedDate && (
                <span className="text-xs text-text-secondary">
                  Completed on {assessment.completedDate}
                </span>
              )}
              <div className="ml-auto">
                {assessment.status === 'available' && (
                  <Button size="sm" className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                )}
                {assessment.status === 'completed' && (
                  <Button size="sm" variant="outline" className="border-border-dark text-text-primary hover:bg-dark-primary">
                    Retake
                  </Button>
                )}
                {assessment.status === 'locked' && (
                  <Button size="sm" variant="outline" disabled className="border-border-dark text-gray-500">
                    Locked
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillAssessments;
