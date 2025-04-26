import React, { useRef, useEffect } from 'react';

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
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="bg-gray-700 rounded-full h-20 w-20 flex items-center justify-center">
            <span className="text-xl text-white font-semibold">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
          {username} {isSelf && '(You)'}
        </div>
        
        {isScreenSharing && (
          <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
            Screen Sharing
          </div>
        )}
      </div>
    </div>
  );
}