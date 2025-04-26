import React from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isMessagesPanelOpen: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
  onToggleMessagesPanel: () => void;
}

export function VideoControls({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  isMessagesPanelOpen,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
  onToggleMessagesPanel
}: VideoControlsProps) {
  return (
    <div className="flex items-center justify-center space-x-3 p-4 bg-[#141e2f] rounded-lg shadow-lg">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleAudio}
        className={`rounded-full ${isAudioEnabled ? 'bg-gray-100' : 'bg-red-100 text-red-500'}`}
      >
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleVideo}
        className={`rounded-full ${isVideoEnabled ? 'bg-gray-100' : 'bg-red-100 text-red-500'}`}
      >
        {isVideoEnabled ? <Video /> : <VideoOff />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleScreenShare}
        className={`rounded-full ${isScreenSharing ? 'bg-blue-100 text-blue-500' : 'bg-gray-100'}`}
      >
        <Monitor />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleMessagesPanel}
        className={`rounded-full ${isMessagesPanelOpen ? 'bg-blue-100 text-blue-500' : 'bg-gray-100'}`}
      >
        <MessageSquare />
      </Button>
      
      <Button
        variant="destructive"
        size="icon"
        onClick={onEndCall}
        className="rounded-full bg-red-500 hover:bg-red-600"
      >
        <Phone className="rotate-135" />
      </Button>
    </div>
  );
}