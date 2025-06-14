
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, Settings } from 'lucide-react';

export const VideoCallPanel = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <h3 className="text-white font-medium">Video Call</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Main Video (Candidate) */}
        <div className="relative bg-dark-primary rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-tech-green rounded-full flex items-center justify-center">
              <span className="text-dark-primary font-semibold text-xl">SC</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded">
            <span className="text-white text-sm">Sarah Chen</span>
          </div>
          {!isVideoOff && (
            <div className="absolute top-4 right-4">
              <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Interviewer Video (Small) */}
        <div className="relative bg-dark-primary rounded-lg overflow-hidden aspect-video max-w-[200px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded">
            <span className="text-white text-xs">John Doe (You)</span>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className={isMuted ? "bg-red-600 hover:bg-red-700" : "bg-dark-primary hover:bg-gray-700"}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="icon"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-dark-primary hover:bg-gray-700"}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};
