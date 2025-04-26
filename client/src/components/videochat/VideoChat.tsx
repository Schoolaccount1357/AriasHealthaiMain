import React, { useState, useEffect } from 'react';
import { useVideoChat } from '../../hooks/use-video-chat';
import { VideoControls } from './VideoControls';
import { VideoStream } from './VideoStream';
import { ChatPanel } from './ChatPanel';
import { PeerConnection } from '../../types/videochat';

interface VideoChatProps {
  username: string;
  roomId: string;
  onEndCall?: () => void;
}

export function VideoChat({ username, roomId, onEndCall }: VideoChatProps) {
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {
    roomState,
    initializeVideoChat,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
    sendMessage
  } = useVideoChat(username, roomId);
  
  // Initialize the video chat when component mounts
  useEffect(() => {
    const initialize = async () => {
      await initializeVideoChat();
      setIsInitialized(true);
    };
    
    initialize();
  }, []);
  
  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    }
  };
  
  const handleToggleMessagesPanel = () => {
    setIsMessagesPanelOpen(!isMessagesPanelOpen);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 p-4 flex">
        <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isMessagesPanelOpen ? 'md:w-2/3' : 'w-full'}`}>
          {/* Local video stream */}
          <div className="aspect-video md:aspect-auto h-full">
            <VideoStream
              stream={roomState.localStream}
              username={roomState.username}
              muted={true}
              isSelf={true}
              isScreenSharing={roomState.isScreenSharing}
            />
          </div>
          
          {/* Remote video streams */}
          {Object.values(roomState.peers).map((peer: PeerConnection) => (
            <div key={peer.peerId} className="aspect-video md:aspect-auto h-full">
              <VideoStream
                stream={peer.stream || null}
                username={peer.username}
              />
            </div>
          ))}
        </div>
        
        {/* Chat panel */}
        {isMessagesPanelOpen && (
          <div className="hidden md:block md:w-1/3 ml-4">
            <ChatPanel 
              messages={roomState.messages}
              onSendMessage={sendMessage}
              open={isMessagesPanelOpen}
            />
          </div>
        )}
      </div>
      
      {/* Mobile chat panel (shows as full overlay on mobile) */}
      {isMessagesPanelOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white p-4">
          <ChatPanel 
            messages={roomState.messages}
            onSendMessage={sendMessage}
            open={isMessagesPanelOpen}
          />
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleToggleMessagesPanel}
              className="p-2 bg-gray-200 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div className="p-4">
        <VideoControls
          isAudioEnabled={roomState.isAudioEnabled}
          isVideoEnabled={roomState.isVideoEnabled}
          isScreenSharing={roomState.isScreenSharing}
          isMessagesPanelOpen={isMessagesPanelOpen}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenSharing}
          onEndCall={handleEndCall}
          onToggleMessagesPanel={handleToggleMessagesPanel}
        />
      </div>
    </div>
  );
}