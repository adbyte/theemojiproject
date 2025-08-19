import React, { useState } from 'react';
import { gameReviews } from '../data/gameData';
import { Review } from '../types';
import EmojiCharacter from './EmojiCharacter';
import { Star, GamepadIcon, Eye } from 'lucide-react';

interface Module3Props {
  userName: string;
  onComplete: () => void;
}

const Module3: React.FC<Module3Props> = ({ userName, onComplete }) => {
  const [analyzedReviews, setAnalyzedReviews] = useState<Set<number>>(new Set());
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const calculateOverallScore = () => {
    let totalPositive = 0;
    let totalNegative = 0;
    
    gameReviews.forEach(review => {
      totalPositive += review.positiveWords.length;
      totalNegative += review.negativeWords.length;
    });
    
    const ratio = totalPositive / (totalPositive + totalNegative);
    return Math.round(ratio * 100);
  };

  const handleReviewClick = (reviewId: number) => {
    setAnalyzedReviews(prev => new Set(prev).add(reviewId));
  };

  const handleRatingSubmit = () => {
    const score = calculateOverallScore();
    const expectedRating = Math.round(score / 20); // Convert 0-100 to 1-5 stars
    const difference = Math.abs(selectedRating - expectedRating);
    
    setFinalScore(score);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const renderHighlightedText = (review: Review) => {
    let highlightedText = review.text;
    
    // Highlight positive words in green
    review.positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="bg-green-200 text-green-800 px-1 rounded font-semibold">${word}</span>`);
    });
    
    // Highlight negative words in red
    review.negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="bg-red-200 text-red-800 px-1 rounded font-semibold">${word}</span>`);
    });
    
    return highlightedText;
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <EmojiCharacter 
            mood="excited" 
            size="large"
            message={`Outstanding work, ${userName}! You're now a certified Feelings Trainer!`}
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Mission Complete!</h2>
          <p className="text-lg text-gray-600 mt-2">
            You analyzed all the reviews and gave the game {selectedRating} stars!
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-600">Overall Feelings Score: {finalScore}/100</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <GamepadIcon className="w-10 h-10" />
            The Review Resolver
          </h1>
          <p className="text-xl text-white/90">Help rate "Unicorn Racers 3D" based on these reviews!</p>
        </div>

        <div className="mb-8 flex justify-center">
          <EmojiCharacter 
            mood="thinking"
            message="Click each review to analyze the feelings, then give the game a star rating!"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <GamepadIcon className="text-purple-500" />
              Unicorn Racers 3D
            </h2>
            <p className="text-gray-600">A magical racing adventure game</p>
          </div>

          <div className="space-y-4 mb-8">
            {gameReviews.map((review, index) => (
              <div 
                key={review.id}
                onClick={() => handleReviewClick(review.id)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  analyzedReviews.has(review.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Eye className={`w-5 h-5 mt-1 ${analyzedReviews.has(review.id) ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div 
                      className="text-gray-800"
                      dangerouslySetInnerHTML={{ 
                        __html: analyzedReviews.has(review.id) ? renderHighlightedText(review) : review.text 
                      }}
                    />
                    {analyzedReviews.has(review.id) && (
                      <div className="mt-2 text-sm">
                        <span className="text-green-600 font-medium">
                          Positive words: {review.positiveWords.length}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-red-600 font-medium">
                          Negative words: {review.negativeWords.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {analyzedReviews.size > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Overall Feelings Score: {calculateOverallScore()}/100
              </h3>
              <p className="text-center text-gray-600">
                Based on {analyzedReviews.size}/{gameReviews.length} analyzed reviews
              </p>
            </div>
          )}

          {analyzedReviews.size === gameReviews.length && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Give your star rating:</h3>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`text-4xl transition-all duration-200 ${
                      star <= selectedRating ? 'text-yellow-500' : 'text-gray-300'
                    } hover:text-yellow-400`}
                  >
                    <Star className="w-12 h-12" fill={star <= selectedRating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              
              {selectedRating > 0 && (
                <button
                  onClick={handleRatingSubmit}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 text-xl"
                >
                  Submit Rating ({selectedRating} {selectedRating === 1 ? 'Star' : 'Stars'})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module3;