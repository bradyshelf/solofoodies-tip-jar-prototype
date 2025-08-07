

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatConversation = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Mock chat user data - in a real app this would come from an API
  const chatUser = {
    username: '@UserInstagram',
    avatar: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
  };

  const handleBack = () => {
    navigate('/chat');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Send first auto-reply after a short delay
      setTimeout(() => {
        const firstAutoReply: Message = {
          id: Date.now() + 1,
          text: "Thanks for your message!",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, firstAutoReply]);

        // Send second auto-reply after another delay
        setTimeout(() => {
          const secondAutoReply: Message = {
            id: Date.now() + 2,
            text: "This is an automated response. We'll get back to you soon!",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, secondAutoReply]);
        }, 1500);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit',
        year: '2-digit'
      });
    }
  };

  // Helper function to determine if we should show timestamp
  const shouldShowTimestamp = (currentIndex: number) => {
    if (currentIndex === messages.length - 1) return true; // Always show on last message
    
    const currentMessage = messages[currentIndex];
    const nextMessage = messages[currentIndex + 1];
    
    // Show timestamp if next message is from different sender
    return currentMessage.isUser !== nextMessage.isUser;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <Avatar className="w-8 h-8">
            <AvatarImage src={chatUser.avatar} alt={chatUser.username} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">{chatUser.username}</span>
        </div>
        <button>
          <div className="w-6 h-6 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Start a conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className="space-y-1">
              <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
              {shouldShowTimestamp(index) && (
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-400 px-2">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full border-gray-300 px-4 py-2"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 w-10 h-10"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;

