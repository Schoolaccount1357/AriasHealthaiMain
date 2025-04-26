import React, { useState, useEffect } from 'react';
import { useVideoChat } from '../../hooks/use-video-chat';
import { VideoStream } from './VideoStream';
import { VideoControls } from './VideoControls';
import { ChatPanel } from './ChatPanel';
import { User } from '../../types/videochat';

interface VideoChatProps {
  username: string;
  roomId: string;
  onDisconnect?: () => void;
}

export function VideoChat({ username, roomId, onDisconnect }: VideoChatProps) {
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const {
    roomState,
    initializeVideoChat,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
    sendMessage
  } = useVideoChat(username, roomId);

  // Initialize video chat when component mounts
  useEffect(() => {
    initializeVideoChat();
  }, []);

  // Handle ending the call
  const handleEndCall = () => {
    if (onDisconnect) {
      onDisconnect();
    }
  };

  // Calculate grid columns based on number of participants
  const getGridCols = () => {
    const peerCount = Object.keys(roomState.peers).length;
    const totalCount = peerCount + 1; // Include local user
    
    if (totalCount <= 1) return 'grid-cols-1';
    if (totalCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (totalCount <= 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-3';
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className={`flex-1 p-4 ${isMessagesPanelOpen ? 'pr-2' : ''}`}>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Room: {roomId}</h1>
          <div className="text-sm text-gray-400">
            {Object.keys(roomState.peers).length + 1} participant(s)
          </div>
        </div>

        <div className="h-[calc(100vh-180px)] mb-4">
          <div className={`grid ${getGridCols()} gap-4 h-full`}>
            {/* Local user's video */}
            <div className="h-full">
              <VideoStream
                stream={roomState.localStream}
                username={roomState.username}
                muted={true}
                isSelf={true}
                isScreenSharing={roomState.isScreenSharing}
              />
            </div>

            {/* Remote users' videos */}
            {Object.entries(roomState.peers).map(([peerId, peer]) => (
              <div key={peerId} className="h-full">
                <VideoStream
                  stream={peer.stream || null}
                  username={peer.username}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-4">
          <VideoControls
            isAudioEnabled={roomState.isAudioEnabled}
            isVideoEnabled={roomState.isVideoEnabled}
            isScreenSharing={roomState.isScreenSharing}
            isMessagesPanelOpen={isMessagesPanelOpen}
            onToggleAudio={toggleAudio}
            onToggleVideo={toggleVideo}
            onToggleScreenShare={toggleScreenSharing}
            onEndCall={handleEndCall}
            onToggleMessagesPanel={() => setIsMessagesPanelOpen(prev => !prev)}
          />
        </div>
      </div>

      {isMessagesPanelOpen && (
        <div className="w-72 border-l border-gray-700">
          <ChatPanel
            messages={roomState.messages}
            onSendMessage={sendMessage}
            open={isMessagesPanelOpen}
          />
        </div>
      )}
    </div>
  );
}