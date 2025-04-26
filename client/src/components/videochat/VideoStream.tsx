import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';

interface VideoStreamProps {
  stream: MediaStream | null;
  username: string;
  muted?: boolean;
  isSelf?: boolean;
  isScreenSharing?: boolean;
}

export function VideoStream({ 
  stream, 
  username, 
  muted = false, 
  isSelf = false,
  isScreenSharing = false
}: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  return (
    <div className="relative rounded-lg overflow-hidden h-full bg-gray-800">
      {stream ? (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isScreenSharing ? 'object-contain bg-black' : 'object-cover'}`}
          autoPlay
          playsInline
          muted={muted}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-800">
          <div className="flex flex-col items-center">
            <div className="bg-[#141e2f] w-20 h-20 flex items-center justify-center rounded-full mb-2">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-white">{username}</p>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-sm rounded-md">
        {username} {isSelf && '(You)'}
      </div>
    </div>
  );
}