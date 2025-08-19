import { SentenceData, PowerSentence, Review } from '../types';

export const module1Sentences: SentenceData[] = [
  {
    id: 1,
    text: "I love my new puppy!",
    sentiment: 'positive',
    keyWord: 'love',
    explanation: "So 'love' is a happy feeling? Got it!"
  },
  {
    id: 2,
    text: "This homework is so boring.",
    sentiment: 'negative',
    keyWord: 'boring',
    explanation: "Ah! 'Boring' makes people feel sad or frustrated!"
  },
  {
    id: 3,
    text: "The weather is okay today.",
    sentiment: 'neutral',
    keyWord: 'okay',
    explanation: "I see! 'Okay' means not really happy or sad!"
  },
  {
    id: 4,
    text: "I hate vegetables!",
    sentiment: 'negative',
    keyWord: 'hate',
    explanation: "'Hate' is a very strong negative feeling!"
  },
  {
    id: 5,
    text: "This game is amazing!",
    sentiment: 'positive',
    keyWord: 'amazing',
    explanation: "Wow! 'Amazing' means super happy!"
  },
  {
    id: 6,
    text: "The movie was just fine.",
    sentiment: 'neutral',
    keyWord: 'fine',
    explanation: "'Fine' is neutral - not excited, not upset!"
  }
];

export const lightningWords: { word: string; sentiment: 'positive' | 'negative' | 'neutral' }[] = [
  { word: 'awesome', sentiment: 'positive' },
  { word: 'terrible', sentiment: 'negative' },
  { word: 'normal', sentiment: 'neutral' },
  { word: 'fantastic', sentiment: 'positive' },
  { word: 'awful', sentiment: 'negative' },
  { word: 'decent', sentiment: 'neutral' },
  { word: 'wonderful', sentiment: 'positive' },
  { word: 'horrible', sentiment: 'negative' },
  { word: 'regular', sentiment: 'neutral' },
  { word: 'brilliant', sentiment: 'positive' }
];

export const module2SentencePairs: PowerSentence[][] = [
  [
    {
      id: 1,
      text: "The movie was good.",
      sentiment: 'positive',
      intensity: 60,
      keyWord: 'good'
    },
    {
      id: 2,
      text: "The movie was absolutely amazing!",
      sentiment: 'positive',
      intensity: 95,
      keyWord: 'amazing'
    }
  ],
  [
    {
      id: 3,
      text: "I don't like this food.",
      sentiment: 'negative',
      intensity: 40,
      keyWord: 'don\'t like'
    },
    {
      id: 4,
      text: "This food is disgusting!",
      sentiment: 'negative',
      intensity: 90,
      keyWord: 'disgusting'
    }
  ],
  [
    {
      id: 5,
      text: "The game was fun.",
      sentiment: 'positive',
      intensity: 70,
      keyWord: 'fun'
    },
    {
      id: 6,
      text: "The game was INCREDIBLE!",
      sentiment: 'positive',
      intensity: 100,
      keyWord: 'incredible'
    }
  ]
];

export const sliderWords: { word: string; expectedValue: number }[] = [
  { word: 'terrible', expectedValue: 10 },
  { word: 'bad', expectedValue: 25 },
  { word: 'okay', expectedValue: 50 },
  { word: 'good', expectedValue: 75 },
  { word: 'amazing', expectedValue: 95 }
];

export const gameReviews: Review[] = [
  {
    id: 1,
    text: "This game is the best thing ever! So fun and exciting!",
    positiveWords: ['best', 'fun', 'exciting'],
    negativeWords: [],
    overallSentiment: 'positive'
  },
  {
    id: 2,
    text: "It was okay. The graphics were cool, but the story was boring.",
    positiveWords: ['okay', 'cool'],
    negativeWords: ['boring'],
    overallSentiment: 'mixed'
  },
  {
    id: 3,
    text: "I hated it. It was a complete waste of time.",
    positiveWords: [],
    negativeWords: ['hated', 'waste'],
    overallSentiment: 'negative'
  }
];