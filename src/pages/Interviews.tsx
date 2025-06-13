
import { useState, useMemo } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  User, 
  MapPin, 
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ScheduleInterviewModal from '@/components/ScheduleInterviewModal';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  position: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  progress?: number;
  timezone: string;
}

const Interviews = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Mock data
  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      candidateAvatar: 'SJ',
      position: 'Senior Frontend Developer',
      company: 'TechCorp',
      date: '2024-06-15',
      time: '14:00',
      duration: '60 min',
      status: 'scheduled',
      timezone: 'PST'
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      candidateAvatar: 'MC',
      position: 'Full Stack Engineer',
      company: 'StartupInc',
      date: '2024-06-15',
      time: '16:30',
      duration: '90 min',
      status: 'in-progress',
      progress: 65,
      timezone: 'EST'
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      candidateAvatar: 'ER',
      position: 'Backend Developer',
      company: 'DevStudio',
      date: '2024-06-14',
      time: '10:00',
      duration: '45 min',
      status: 'completed',
      timezone: 'PST'
    },
    {
      id: '4',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      candidateAvatar: 'DK',
      position: 'DevOps Engineer',
      company: 'CloudTech',
      date: '2024-06-13',
      time: '11:30',
      duration: '60 min',
      status: 'cancelled',
      timezone: 'CST'
    },
    {
      id: '5',
      candidateName: 'Lisa Wang',
      candidateEmail: 'lisa.wang@email.com',
      candidateAvatar: 'LW',
      position: 'Data Scientist',
      company: 'DataFlow',
      date: '2024-06-16',
      time: '09:00',
      duration: '75 min',
      status: 'scheduled',
      timezone: 'PST'
    }
  ];

  const filteredInterviews = useMemo(() => {
    return interviews.filter(interview => {
      const matchesTab = activeTab === 'all' || interview.status === activeTab.replace('-', '-');
      const matchesSearch = searchQuery === '' || 
        interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [interviews, activeTab, searchQuery]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock size={16} className="text-blue-400" />;
      case 'in-progress': return <Play size={16} className="text-tech-green" />;
      case 'completed': return <CheckCircle size={16} className="text-gray-400" />;
      case 'cancelled': return <XCircle size={16} className="text-red-400" />;
      default: return <AlertCircle size={16} className="text-yellow-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'in-progress': 'bg-tech-green/20 text-tech-green border-tech-green/30',
      completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} capitalize border`}>
        {getStatusIcon(status)}
        <span className="ml-1">{status.replace('-', ' ')}</span>
      </Badge>
    );
  };

  const getActionButton = (interview: Interview) => {
    switch (interview.status) {
      case 'scheduled':
        return (
          <Button size="sm" className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
            Join Interview
          </Button>
        );
      case 'in-progress':
        return (
          <Button size="sm" className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
            Resume
          </Button>
        );
      case 'completed':
        return (
          <Button size="sm" variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
            View Report
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
            Reschedule
          </Button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <div className="bg-dark-secondary border-b border-border-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Interview Management</h1>
            <p className="text-text-secondary">Manage and track all your technical interviews</p>
          </div>
          
          <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold">
                <Plus size={16} className="mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-secondary border-border-dark">
              <DialogHeader>
                <DialogTitle className="text-text-primary">Schedule New Interview</DialogTitle>
              </DialogHeader>
              <ScheduleInterviewModal onClose={() => setIsScheduleModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="Search candidates, positions, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-primary border-border-dark text-text-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
              <Calendar size={16} className="mr-2" />
              Date Range
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-secondary border-border-dark">
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              Scheduled ({interviews.filter(i => i.status === 'scheduled').length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              In Progress ({interviews.filter(i => i.status === 'in-progress').length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              Completed ({interviews.filter(i => i.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              Cancelled ({interviews.filter(i => i.status === 'cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="bg-dark-secondary border border-border-dark rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-primary">
                    {selectedItems.length} interview(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-border-dark text-text-secondary">
                      Reschedule All
                    </Button>
                    <Button size="sm" variant="outline" className="border-border-dark text-red-400 hover:text-red-300">
                      Cancel All
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Interview Cards */}
            <div className="grid gap-4">
              {filteredInterviews.map((interview) => (
                <Card key={interview.id} className="bg-dark-secondary border-border-dark hover:border-tech-green/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-tech-green/20 rounded-full flex items-center justify-center">
                          <span className="text-tech-green font-semibold">{interview.candidateAvatar}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-text-primary">{interview.candidateName}</h3>
                            {getStatusBadge(interview.status)}
                          </div>
                          <p className="text-text-secondary text-sm mb-1">{interview.candidateEmail}</p>
                          <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {interview.position}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {interview.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {interview.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-text-primary font-medium">
                            {new Date(`${interview.date}T${interview.time}`).toLocaleDateString()}
                          </div>
                          <div className="text-text-secondary text-sm">
                            {interview.time} {interview.timezone}
                          </div>
                          {interview.status === 'in-progress' && interview.progress && (
                            <div className="mt-2">
                              <div className="text-xs text-text-secondary mb-1">Progress: {interview.progress}%</div>
                              <div className="w-20 h-1 bg-dark-primary rounded-full">
                                <div 
                                  className="h-full bg-tech-green rounded-full transition-all duration-300"
                                  style={{ width: `${interview.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {getActionButton(interview)}
                          <Button size="sm" variant="ghost" className="text-text-secondary hover:text-text-primary">
                            <MoreHorizontal size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredInterviews.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No interviews found</h3>
                <p className="text-text-secondary">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Start by scheduling your first interview'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Interviews;
