
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, Award, User, FileText, Target } from 'lucide-react';
import WelcomeHeader from '@/components/candidate/WelcomeHeader';
import UpcomingInterviews from '@/components/candidate/UpcomingInterviews';
import InterviewHistory from '@/components/candidate/InterviewHistory';
import PerformanceAnalytics from '@/components/candidate/PerformanceAnalytics';
import ProfileCompletion from '@/components/candidate/ProfileCompletion';
import SkillAssessments from '@/components/candidate/SkillAssessments';

const CandidateDashboard = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-text-primary">
      <div className="container mx-auto px-6 py-8">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileCompletion />
            <UpcomingInterviews />
            <InterviewHistory />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <PerformanceAnalytics />
            <SkillAssessments />
            
            {/* Quick Actions */}
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-lg text-text-primary flex items-center gap-2">
                  <Target className="h-5 w-5 text-tech-green" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                  <User className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-primary hover:bg-dark-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-primary hover:bg-dark-primary">
                  <Award className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
