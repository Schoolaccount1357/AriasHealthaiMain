import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, MicOff, Video, VideoOff, 
  ScreenShare, MonitorX,
  MessageSquare, PhoneOff 
} from 'lucide-react';

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isMessagesPanelOpen: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleMessagesPanel: () => void;
  onEndCall: () => void;
}

export function VideoControls({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  isMessagesPanelOpen,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleMessagesPanel,
  onEndCall
}: VideoControlsProps) {
  return (
    <div className="flex justify-center items-center space-x-4 p-4 bg-gray-800 rounded-lg">
      <Button
        variant="ghost"
        className={`rounded-full w-12 h-12 ${isAudioEnabled ? 'bg-gray-700' : 'bg-red-600'}`}
        onClick={onToggleAudio}
        title={isAudioEnabled ? "Mute Microphone" : "Unmute Microphone"}
      >
        {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
      </Button>
      
      <Button
        variant="ghost"
        className={`rounded-full w-12 h-12 ${isVideoEnabled ? 'bg-gray-700' : 'bg-red-600'}`}
        onClick={onToggleVideo}
        title={isVideoEnabled ? "Turn Off Camera" : "Turn On Camera"}
      >
        {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
      </Button>
      
      <Button
        variant="ghost"
        className={`rounded-full w-12 h-12 ${isScreenSharing ? 'bg-green-600' : 'bg-gray-700'}`}
        onClick={onToggleScreenShare}
        title={isScreenSharing ? "Stop Sharing Screen" : "Share Screen"}
      >
        {isScreenSharing ? <MonitorX size={24} /> : <ScreenShare size={24} />}
      </Button>
      
      <Button
        variant="ghost"
        className={`rounded-full w-12 h-12 ${isMessagesPanelOpen ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={onToggleMessagesPanel}
        title={isMessagesPanelOpen ? "Close Chat" : "Open Chat"}
      >
        <MessageSquare size={24} />
      </Button>
      
      <Button
        variant="ghost"
        className="rounded-full w-12 h-12 bg-red-600"
        onClick={onEndCall}
        title="End Call"
      >
        <PhoneOff size={24} />
      </Button>
    </div>
  );
}