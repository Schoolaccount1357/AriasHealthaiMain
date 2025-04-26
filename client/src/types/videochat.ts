import { Instance as SimplePeerInstance } from 'simple-peer';

export interface User {
  id: string;
  username: string;
}

export interface Message {
  content: string;
  from: string;
  username: string;
  time: string;
}

export interface PeerConnection {
  peerId: string;
  peer: SimplePeerInstance;
  username: string;
  stream?: MediaStream;
  video?: boolean;
  audio?: boolean;
}

export interface RoomState {
  roomId: string;
  localStream: MediaStream | null;
  username: string;
  peers: Record<string, PeerConnection>;
  messages: Message[];
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  screenStream: MediaStream | null;
}