import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '../../types/videochat';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  open: boolean;
}

export function ChatPanel({ messages, onSendMessage, open }: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle message send
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  if (!open) return null;
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 bg-[#141e2f] text-white font-semibold">
        Chat
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            No messages yet.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-3 max-w-[80%] ${msg.from === 'self' ? 'ml-auto' : ''}`}
            >
              <div className="text-xs text-gray-500 mb-1">
                {msg.username}, {new Date(msg.time).toLocaleTimeString()}
              </div>
              <div className={`p-3 rounded-lg ${
                msg.from === 'self' 
                  ? 'bg-[#3e64dd] text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t">
        <div className="flex">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button
            type="submit"
            variant="default"
            className="bg-[#3e64dd]"
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}