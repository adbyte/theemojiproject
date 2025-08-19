import React, { useState } from 'react';
import EmojiCharacter from './EmojiCharacter';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [showIntro, setShowIntro] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowIntro(true);
      setTimeout(() => onStart(name.trim()), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-500">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" />
            The Emoj.I. Project
            <Sparkles className="text-yellow-500" />
          </h1>
          <p className="text-gray-600">A Sentiment Analysis Adventure!</p>
        </div>

        <div className="mb-6">
          <EmojiCharacter 
            mood={showIntro ? 'excited' : 'confused'} 
            size="large"
            message={showIntro ? `Hi ${name}! Let's start training!` : "Help me understand human feelings!"}
          />
        </div>

        {!showIntro ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                What should I call you, Feelings Trainer?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg text-center"
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Training! <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="animate-pulse">
            <p className="text-lg text-gray-600">Preparing your training...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;