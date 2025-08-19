import React from 'react';
import { Bot } from 'lucide-react';

interface EmojiCharacterProps {
  mood: 'happy' | 'confused' | 'excited' | 'thinking';
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const EmojiCharacter: React.FC<EmojiCharacterProps> = ({ 
  mood, 
  message, 
  size = 'medium' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'large': return 'w-20 h-20';
      default: return 'w-16 h-16';
    }
  };

  const getMoodClasses = () => {
    switch (mood) {
      case 'happy': return 'text-green-500 animate-bounce';
      case 'confused': return 'text-yellow-500 animate-pulse';
      case 'excited': return 'text-blue-500 animate-bounce';
      case 'thinking': return 'text-purple-500 animate-pulse';
      default: return 'text-blue-500';
    }
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy': return '😊';
      case 'confused': return '🤔';
      case 'excited': return '🤖';
      case 'thinking': return '💭';
      default: return '🤖';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${getSizeClasses()} ${getMoodClasses()} relative`}>
        <Bot className="w-full h-full" />
        <div className="absolute -top-2 -right-2 text-2xl">
          {getMoodEmoji()}
        </div>
      </div>
      {message && (
        <div className="bg-white border-2 border-blue-300 rounded-lg p-3 max-w-xs text-center relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-blue-300 rotate-45"></div>
          <p className="text-sm font-medium text-gray-800">{message}</p>
        </div>
      )}
    </div>
  );
};

export default EmojiCharacter;