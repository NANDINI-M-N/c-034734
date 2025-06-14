
import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Plus, Mail, Calendar, Download, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CandidateTable } from '@/components/candidates/CandidateTable';
import { CandidateCards } from '@/components/candidates/CandidateCards';
import { CandidateFilters } from '@/components/candidates/CandidateFilters';
import { BulkActions } from '@/components/candidates/BulkActions';
import { mockCandidates, Candidate } from '@/data/mockCandidates';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  
  // Filter states
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Filtered candidates
  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      // Search filter
      const searchMatch = !searchQuery || 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Skills filter
      const skillsMatch = skillsFilter.length === 0 || 
        skillsFilter.some(skill => candidate.skills.some(s => s.name === skill));

      // Experience filter
      const experienceMatch = experienceFilter.length === 0 || 
        experienceFilter.includes(candidate.experienceLevel);

      // Location filter
      const locationMatch = locationFilter.length === 0 || 
        locationFilter.includes(candidate.location);

      // Availability filter
      const availabilityMatch = availabilityFilter.length === 0 || 
        availabilityFilter.includes(candidate.availability);

      // Rating filter
      const ratingMatch = ratingFilter === null || candidate.overallRating >= ratingFilter;

      return searchMatch && skillsMatch && experienceMatch && locationMatch && availabilityMatch && ratingMatch;
    });
  }, [searchQuery, skillsFilter, experienceFilter, locationFilter, availabilityFilter, ratingFilter]);

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const clearFilters = () => {
    setSkillsFilter([]);
    setExperienceFilter([]);
    setLocationFilter([]);
    setAvailabilityFilter([]);
    setRatingFilter(null);
  };

  const activeFiltersCount = skillsFilter.length + experienceFilter.length + locationFilter.length + availabilityFilter.length + (ratingFilter ? 1 : 0);

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <div className="bg-dark-secondary border-b border-border-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Candidate Management</h1>
            <p className="text-text-secondary">
              {filteredCandidates.length} of {mockCandidates.length} candidates
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
              <Plus size={16} className="mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="text"
                placeholder="Search candidates by name, email, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-primary border-border-dark text-text-primary"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-border-dark text-text-secondary hover:text-text-primary"
            >
              <Filter size={16} className="mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-tech-green text-dark-primary">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-text-secondary hover:text-text-primary"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-dark-primary rounded-lg p-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={viewMode === 'table' ? 'bg-tech-green text-dark-primary' : 'text-text-secondary'}
              >
                <List size={16} />
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className={viewMode === 'cards' ? 'bg-tech-green text-dark-primary' : 'text-text-secondary'}
              >
                <Grid size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <BulkActions
            selectedCount={selectedCandidates.length}
            onClearSelection={() => setSelectedCandidates([])}
          />
        )}
      </div>

      <div className="flex">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-80 bg-dark-secondary border-r border-border-dark">
            <CandidateFilters
              skillsFilter={skillsFilter}
              setSkillsFilter={setSkillsFilter}
              experienceFilter={experienceFilter}
              setExperienceFilter={setExperienceFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {viewMode === 'table' ? (
            <CandidateTable
              candidates={filteredCandidates}
              selectedCandidates={selectedCandidates}
              onSelectCandidate={handleSelectCandidate}
              onSelectAll={handleSelectAll}
            />
          ) : (
            <CandidateCards
              candidates={filteredCandidates}
              selectedCandidates={selectedCandidates}
              onSelectCandidate={handleSelectCandidate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
