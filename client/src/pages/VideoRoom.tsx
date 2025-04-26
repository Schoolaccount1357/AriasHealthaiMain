import React, { useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { VideoChat } from '../components/videochat/VideoChat';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VideoRoom() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/video-room/:roomId?');
  const roomId = params?.roomId;
  
  const [username, setUsername] = useState('');
  const [customRoomId, setCustomRoomId] = useState(roomId || '');
  const [isJoined, setIsJoined] = useState(!!roomId);
  
  // Handle joining a room
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim() && customRoomId.trim()) {
      if (roomId !== customRoomId) {
        setLocation(`/video-room/${customRoomId}`);
      }
      setIsJoined(true);
    }
  };
  
  // Handle disconnecting from a room
  const handleDisconnect = () => {
    setIsJoined(false);
    setLocation('/video-room');
  };
  
  return (
    <MainLayout>
      {isJoined ? (
        <VideoChat 
          username={username} 
          roomId={customRoomId}
          onDisconnect={handleDisconnect}
        />
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-[#141e2f] mb-6 text-center">
              Join Video Call
            </h1>
            
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
                  Room ID
                </label>
                <Input
                  id="roomId"
                  type="text"
                  value={customRoomId}
                  onChange={(e) => setCustomRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a room ID to create or join an existing room
                </p>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#3e64dd]"
                disabled={!username.trim() || !customRoomId.trim()}
              >
                Join Room
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Connect with peers in a secure, private video chat room
              </p>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}