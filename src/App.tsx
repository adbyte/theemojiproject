import React, { useState } from 'react';
import { GameState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import Module1 from './components/Module1';
import Module2 from './components/Module2';
import Module3 from './components/Module3';
import Certificate from './components/Certificate';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    user: null,
    currentScreen: 'welcome',
    module1Progress: 0,
    module2Progress: 0,
    module3Progress: 0,
  });

  const handleStart = (name: string) => {
    setGameState(prev => ({
      ...prev,
      user: {
        name,
        currentModule: 1,
        completedModules: [],
        score: 0,
      },
      currentScreen: 'module1'
    }));
  };

  const handleModule1Complete = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'module2',
      user: prev.user ? {
        ...prev.user,
        completedModules: [...prev.user.completedModules, 1],
        currentModule: 2
      } : null
    }));
  };

  const handleModule2Complete = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'module3',
      user: prev.user ? {
        ...prev.user,
        completedModules: [...prev.user.completedModules, 2],
        currentModule: 3
      } : null
    }));
  };

  const handleModule3Complete = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'certificate',
      user: prev.user ? {
        ...prev.user,
        completedModules: [...prev.user.completedModules, 3],
        currentModule: 4
      } : null
    }));
  };

  const handleRestart = () => {
    setGameState({
      user: null,
      currentScreen: 'welcome',
      module1Progress: 0,
      module2Progress: 0,
      module3Progress: 0,
    });
  };

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'module1':
        return (
          <Module1 
            userName={gameState.user?.name || ''} 
            onComplete={handleModule1Complete} 
          />
        );
      case 'module2':
        return (
          <Module2 
            userName={gameState.user?.name || ''} 
            onComplete={handleModule2Complete} 
          />
        );
      case 'module3':
        return (
          <Module3 
            userName={gameState.user?.name || ''} 
            onComplete={handleModule3Complete} 
          />
        );
      case 'certificate':
        return (
          <Certificate 
            userName={gameState.user?.name || ''} 
            onRestart={handleRestart} 
          />
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;