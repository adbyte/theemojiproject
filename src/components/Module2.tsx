import React, { useState, useEffect } from 'react';
import { module2SentencePairs, sliderWords } from '../data/gameData';
import { PowerSentence } from '../types';
import EmojiCharacter from './EmojiCharacter';
import { Battery, Target } from 'lucide-react';

interface Module2Props {
  userName: string;
  onComplete: () => void;
}

const Module2: React.FC<Module2Props> = ({ userName, onComplete }) => {
  const [currentPairIndex, setPairIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [sliderWordIndex, setSliderWordIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [sliderScore, setSliderScore] = useState(0);
  const [completedPairs, setCompletedPairs] = useState(0);

  const currentPair = module2SentencePairs[currentPairIndex];

  const handleNextPair = () => {
    if (currentPairIndex < module2SentencePairs.length - 1) {
      setPairIndex(prev => prev + 1);
      setCompletedPairs(prev => prev + 1);
    } else {
      setShowSlider(true);
    }
  };

  const handleSliderSubmit = () => {
    const currentWord = sliderWords[sliderWordIndex];
    const difference = Math.abs(sliderValue - currentWord.expectedValue);
    if (difference <= 15) { // Allow some tolerance
      setSliderScore(prev => prev + 1);
    }

    if (sliderWordIndex < sliderWords.length - 1) {
      setSliderWordIndex(prev => prev + 1);
      setSliderValue(50);
    } else {
      setTimeout(onComplete, 1000);
    }
  };

  if (showSlider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Target className="text-purple-500" />
              Sentiment Slider Challenge!
            </h2>
            <p className="text-gray-600 mt-2">Move the slider to match how you feel about this word!</p>
          </div>

          {sliderWordIndex < sliderWords.length ? (
            <div>
              <div className="bg-gray-100 rounded-xl p-6 mb-6 text-center">
                <p className="text-lg text-gray-600">The pizza was</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {sliderWords[sliderWordIndex].word}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>😠 Very Bad</span>
                  <span>😐 Neutral</span>
                  <span>😄 Very Good</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-red-500 via-gray-400 to-green-500 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold">{sliderValue}</span>
                </div>
              </div>

              <button
                onClick={handleSliderSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
              >
                Submit Answer
              </button>

              <div className="text-center mt-4 text-gray-600">
                Question {sliderWordIndex + 1} of {sliderWords.length}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <EmojiCharacter 
                mood="excited" 
                size="large"
                message={`Awesome work, ${userName}! You got ${sliderScore}/${sliderWords.length} right!`}
              />
              <h3 className="text-2xl font-bold text-gray-800 mt-4">Slider Challenge Complete!</h3>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (completedPairs >= module2SentencePairs.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <EmojiCharacter 
            mood="excited" 
            size="large"
            message={`You understand power levels, ${userName}! Ready for the final mission?`}
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Module 2 Complete!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">The Power-Up Meter</h1>
          <p className="text-xl text-white/90">Some feelings are stronger than others!</p>
          <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-block">
            <span className="text-white font-bold">Pair {currentPairIndex + 1} of {module2SentencePairs.length}</span>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <EmojiCharacter 
            mood="thinking"
            message="Watch how the power meters fill up differently!"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {currentPair.map((sentence, index) => (
            <div key={sentence.id} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-4">
                <p className="text-xl font-medium text-gray-800">{sentence.text}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Battery className="text-gray-600 w-6 h-6" />
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-2000 rounded-full ${
                        sentence.sentiment === 'positive' 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${sentence.intensity}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm font-bold text-gray-600">
                      Power: {sentence.intensity}/100
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Key word: "{sentence.keyWord}"
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleNextPair}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 text-xl shadow-lg"
          >
            {currentPairIndex < module2SentencePairs.length - 1 ? 'Next Pair' : 'Start Slider Challenge!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module2;