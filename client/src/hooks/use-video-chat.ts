import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { User, Message, PeerConnection, RoomState } from '../types/videochat';

export function useVideoChat(initialUsername: string, initialRoomId: string) {
  const [roomState, setRoomState] = useState<RoomState>({
    roomId: initialRoomId,
    localStream: null,
    username: initialUsername,
    peers: {},
    messages: [],
    isAudioEnabled: true,
    isVideoEnabled: true,
    isScreenSharing: false,
    screenStream: null
  });
  
  const socketRef = useRef<Socket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  
  // Initialize video chat
  const initializeVideoChat = async () => {
    try {
      // Get media stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      localStreamRef.current = stream;
      
      setRoomState(prev => ({
        ...prev,
        localStream: stream
      }));
      
      // Connect to socket server
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}`;
      
      socketRef.current = io(wsUrl, { path: '/ws' });
      
      // Join room
      socketRef.current.emit('join', {
        username: initialUsername,
        room: initialRoomId
      });
      
      // Handle existing users in the room
      socketRef.current.on('room-users', (users: User[]) => {
        users.forEach(user => {
          // Create peer connection for each user
          const peer = createPeer(user.id, socketRef.current!.id, stream);
          
          setRoomState(prev => ({
            ...prev,
            peers: {
              ...prev.peers,
              [user.id]: {
                peerId: user.id,
                peer,
                username: user.username
              }
            }
          }));
        });
      });
      
      // Handle new users joining
      socketRef.current.on('user-joined', (user: User) => {
        console.log('User joined:', user);
        
        // Create peer connection for new user
        const peer = createPeer(user.id, socketRef.current!.id, stream);
        
        setRoomState(prev => ({
          ...prev,
          peers: {
            ...prev.peers,
            [user.id]: {
              peerId: user.id,
              peer,
              username: user.username
            }
          }
        }));
      });
      
      // Handle WebRTC signaling
      socketRef.current.on('signal', ({ from, signal, username }) => {
        console.log('Signal received from:', from);
        
        // If we already have this peer, add the signal
        if (roomState.peers[from]) {
          roomState.peers[from].peer.signal(signal);
        } else {
          // Otherwise, add peer as answerer
          const peer = addPeer(from, signal, stream);
          
          setRoomState(prev => ({
            ...prev,
            peers: {
              ...prev.peers,
              [from]: {
                peerId: from,
                peer,
                username
              }
            }
          }));
        }
      });
      
      // Handle messages
      socketRef.current.on('message', (message: Message) => {
        setRoomState(prev => ({
          ...prev,
          messages: [...prev.messages, message]
        }));
      });
      
      // Handle user leaving
      socketRef.current.on('user-left', ({ id }: { id: string }) => {
        console.log('User left:', id);
        
        if (roomState.peers[id]) {
          roomState.peers[id].peer.destroy();
          
          setRoomState(prev => {
            const { [id]: peerToRemove, ...remainingPeers } = prev.peers;
            return {
              ...prev,
              peers: remainingPeers
            };
          });
        }
      });
      
    } catch (error) {
      console.error('Error initializing video chat:', error);
    }
  };
  
  // Create peer as initiator
  const createPeer = (userToSignal: string, callerId: string, stream: MediaStream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream
    });
    
    peer.on('signal', (signal) => {
      if (socketRef.current) {
        socketRef.current.emit('signal', {
          to: userToSignal,
          signal,
          from: callerId
        });
      }
    });
    
    peer.on('stream', (remoteStream) => {
      console.log('Received stream from peer:', userToSignal);
      
      setRoomState(prev => ({
        ...prev,
        peers: {
          ...prev.peers,
          [userToSignal]: {
            ...prev.peers[userToSignal],
            stream: remoteStream
          }
        }
      }));
    });
    
    return peer;
  };
  
  // Add peer as answerer
  const addPeer = (callerId: string, incomingSignal: any, stream: MediaStream) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream
    });
    
    peer.on('signal', (signal) => {
      if (socketRef.current) {
        socketRef.current.emit('signal', {
          to: callerId,
          signal
        });
      }
    });
    
    peer.on('stream', (remoteStream) => {
      console.log('Received stream from peer:', callerId);
      
      setRoomState(prev => ({
        ...prev,
        peers: {
          ...prev.peers,
          [callerId]: {
            ...prev.peers[callerId],
            stream: remoteStream
          }
        }
      }));
    });
    
    peer.signal(incomingSignal);
    
    return peer;
  };
  
  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      
      // Toggle all audio tracks
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      
      setRoomState(prev => ({
        ...prev,
        isAudioEnabled: !prev.isAudioEnabled
      }));
    }
  };
  
  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      
      // Toggle all video tracks
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      
      setRoomState(prev => ({
        ...prev,
        isVideoEnabled: !prev.isVideoEnabled
      }));
    }
  };
  
  // Toggle screen sharing
  const toggleScreenSharing = async () => {
    try {
      if (!roomState.isScreenSharing) {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        
        screenStreamRef.current = screenStream;
        
        // Replace video track in all peer connections
        Object.values(roomState.peers).forEach(({ peer }) => {
          // Find the current video sender
          const videoTrack = screenStream.getVideoTracks()[0];
          const senders = (peer as any)._pc.getSenders();
          const videoSender = senders.find((s: RTCRtpSender) => 
            s.track && s.track.kind === 'video'
          );
          
          if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
          }
        });
        
        // Handle screen sharing ended by user
        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenSharing();
        };
        
        setRoomState(prev => ({
          ...prev,
          isScreenSharing: true,
          screenStream
        }));
      } else {
        stopScreenSharing();
      }
    } catch (error) {
      console.error('Error toggling screen sharing:', error);
    }
  };
  
  // Stop screen sharing
  const stopScreenSharing = () => {
    if (screenStreamRef.current && localStreamRef.current) {
      // Stop all screen sharing tracks
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      
      // Replace with original video track in all peer connections
      Object.values(roomState.peers).forEach(({ peer }) => {
        const videoTrack = localStreamRef.current!.getVideoTracks()[0];
        const senders = (peer as any)._pc.getSenders();
        const videoSender = senders.find((s: RTCRtpSender) => 
          s.track && s.track.kind === 'video'
        );
        
        if (videoSender && videoTrack) {
          videoSender.replaceTrack(videoTrack);
        }
      });
      
      screenStreamRef.current = null;
      
      setRoomState(prev => ({
        ...prev,
        isScreenSharing: false,
        screenStream: null
      }));
    }
  };
  
  // Send message
  const sendMessage = (content: string) => {
    if (socketRef.current && content.trim() !== '') {
      socketRef.current.emit('message', {
        content,
        room: roomState.roomId
      });
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop local media streams
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Destroy all peer connections
      Object.values(roomState.peers).forEach(({ peer }) => {
        peer.destroy();
      });
      
      // Disconnect socket
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  
  return {
    roomState,
    initializeVideoChat,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
    sendMessage
  };
}