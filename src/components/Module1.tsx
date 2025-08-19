import React, { useState, useEffect } from 'react';
import { module1Sentences, lightningWords } from '../data/gameData';
import { SentenceData } from '../types';
import EmojiCharacter from './EmojiCharacter';
import { Timer, Zap } from 'lucide-react';

interface Module1Props {
  userName: string;
  onComplete: () => void;
}

const Module1: React.FC<Module1Props> = ({ userName, onComplete }) => {
  const [currentSentence, setCurrentSentence] = useState<SentenceData | null>(null);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [showLightning, setShowLightning] = useState(false);
  const [lightningScore, setLightningScore] = useState(0);
  const [lightningIndex, setLightningIndex] = useState(0);
  const [lightningTime, setLightningTime] = useState(15);

  useEffect(() => {
    if (sentenceIndex < module1Sentences.length) {
      setCurrentSentence(module1Sentences[sentenceIndex]);
    }
  }, [sentenceIndex]);

  useEffect(() => {
    if (completedCount === 5 && !showLightning) {
      setShowLightning(true);
      setLightningTime(15);
      setLightningIndex(0);
      setLightningScore(0);
    }
  }, [completedCount, showLightning]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showLightning && lightningTime > 0) {
      timer = setTimeout(() => setLightningTime(prev => prev - 1), 1000);
    } else if (showLightning && lightningTime === 0) {
      handleLightningComplete();
    }
    return () => clearTimeout(timer);
  }, [lightningTime, showLightning]);

  const handleDrop = (e: React.DragEvent, sentiment: string) => {
    e.preventDefault();
    setDraggedOver(null);

    if (!currentSentence) return;

    if (sentiment === currentSentence.sentiment) {
      setFeedback({ 
        type: 'success', 
        message: currentSentence.explanation 
      });
      setCompletedCount(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
        setSentenceIndex(prev => prev + 1);
      }, 2000);
    } else {
      setFeedback({ 
        type: 'error', 
        message: `Hmm, let's look closer. The word '${currentSentence.keyWord}' is in that message. Do you think that's a happy or sad word?` 
      });
      
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
      }, 3000);
    }
  };

  const handleLightningAnswer = (sentiment: 'positive' | 'negative' | 'neutral') => {
    if (lightningIndex < lightningWords.length) {
      if (sentiment === lightningWords[lightningIndex].sentiment) {
        setLightningScore(prev => prev + 1);
      }
      setLightningIndex(prev => prev + 1);
    }
  };

  const handleLightningComplete = () => {
    setShowLightning(false);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  if (showLightning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Zap className="text-yellow-500" />
              Lightning Round!
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Timer className="text-red-500" />
                <span className="text-2xl font-bold text-red-500">{lightningTime}s</span>
              </div>
              <div className="text-lg">Score: {lightningScore}/{lightningIndex}</div>
            </div>
          </div>

          {lightningIndex < lightningWords.length ? (
            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <p className="text-3xl font-bold text-gray-800">
                  {lightningWords[lightningIndex].word}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleLightningAnswer('positive')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-xl"
                >
                  😄
                </button>
                <button
                  onClick={() => handleLightningAnswer('neutral')}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-xl"
                >
                  😐
                </button>
                <button
                  onClick={() => handleLightningAnswer('negative')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-xl"
                >
                  😠
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold">Time's up! Final Score: {lightningScore}/{lightningWords.length}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (sentenceIndex >= module1Sentences.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <EmojiCharacter 
            mood="excited" 
            size="large"
            message={`Great job, ${userName}! You're ready for advanced training!`}
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Module 1 Complete!</h2>
          <p className="text-lg text-gray-600 mt-2">You sorted {completedCount} messages correctly!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">The Mood Sorter</h1>
          <p className="text-xl text-white/90">Help Emoj.I. sort these messages by their feelings!</p>
          <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-block">
            <span className="text-white font-bold">Progress: {completedCount}/5</span>
          </div>
        </div>

        {feedback.message && (
          <div className="mb-6 flex justify-center">
            <EmojiCharacter 
              mood={feedback.type === 'success' ? 'happy' : 'confused'}
              message={feedback.message}
            />
          </div>
        )}

        {currentSentence && (
          <div className="mb-8 flex justify-center">
            <div 
              className="bg-white rounded-2xl shadow-xl p-6 cursor-move max-w-md w-full text-center"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', currentSentence.id.toString());
              }}
            >
              <p className="text-xl font-medium text-gray-800">{currentSentence.text}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {(['positive', 'neutral', 'negative'] as const).map((sentiment) => {
            const emojis = { positive: '😄', neutral: '😐', negative: '😠' };
            const colors = { 
              positive: 'from-green-400 to-green-600', 
              neutral: 'from-gray-400 to-gray-600', 
              negative: 'from-red-400 to-red-600' 
            };
            
            return (
              <div
                key={sentiment}
                className={`bg-gradient-to-b ${colors[sentiment]} rounded-2xl shadow-xl p-8 min-h-32 flex flex-col items-center justify-center border-4 transition-all duration-200 ${
                  draggedOver === sentiment ? 'border-yellow-300 scale-105' : 'border-white/50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggedOver(sentiment);
                }}
                onDragLeave={() => setDraggedOver(null)}
                onDrop={(e) => handleDrop(e, sentiment)}
              >
                <div className="text-6xl mb-2">{emojis[sentiment]}</div>
                <p className="text-white font-bold text-xl capitalize">{sentiment}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-white/80 text-lg">
            Drag the message above into the correct feeling bin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Module1;