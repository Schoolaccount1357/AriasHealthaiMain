import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { VideoChat } from '../components/videochat/VideoChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/ui/PageHeader';

export default function VideoCall() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (roomId.trim() && username.trim()) {
      setIsJoined(true);
    }
  };
  
  const handleLeaveRoom = () => {
    setIsJoined(false);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        {!isJoined ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <PageHeader 
              title="Join a Video Call" 
              description="Connect with your assigned peer support partner through secure video conferencing."
            />
            
            <form onSubmit={handleJoinRoom} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="username">Your Name</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="roomId">Room ID</Label>
                <Input
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter a room ID"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the same Room ID as your peer to connect with them
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#10066A] hover:bg-[#0D055D]"
                disabled={!roomId.trim() || !username.trim()}
              >
                Join Video Call
              </Button>
            </form>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">How it works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your name and a unique room ID</li>
                <li>Share the room ID with your peer</li>
                <li>Both you and your peer join using the same room ID</li>
                <li>Connect via secure peer-to-peer video</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)]">
            <VideoChat 
              username={username}
              roomId={roomId}
              onEndCall={handleLeaveRoom}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}