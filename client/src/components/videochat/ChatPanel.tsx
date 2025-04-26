import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../../types/videochat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  open: boolean;
}

export function ChatPanel({ messages, onSendMessage, open }: ChatPanelProps) {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Chat</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${message.from === 'self' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-gray-400 mr-2">
                    {message.from === 'self' ? 'You' : message.username}
                  </span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <div 
                  className={`px-3 py-2 rounded-lg ${
                    message.from === 'self' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button type="submit" size="icon" disabled={!messageInput.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}