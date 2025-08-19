export interface User {
  name: string;
  currentModule: number;
  completedModules: number[];
  score: number;
}

export interface SentenceData {
  id: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keyWord: string;
  explanation: string;
}

export interface PowerSentence {
  id: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  intensity: number; // 1-100
  keyWord: string;
}

export interface Review {
  id: number;
  text: string;
  positiveWords: string[];
  negativeWords: string[];
  overallSentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
}

export interface GameState {
  user: User | null;
  currentScreen: 'welcome' | 'module1' | 'module2' | 'module3' | 'certificate';
  module1Progress: number;
  module2Progress: number;
  module3Progress: number;
}