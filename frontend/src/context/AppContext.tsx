import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Prediction, FruitModule } from '../types';

interface AppContextType {
  history: Prediction[];
  addPrediction: (prediction: Omit<Prediction, 'id' | 'date'>) => void;
  clearHistory: () => void;
  modules: FruitModule[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_MODULES: FruitModule[] = [
  {
    id: 'mango',
    name: 'Mango Grading',
    icon: '🍋',
    status: 'active',
    route: '/mango',
    description: 'Assess mango quality into G1, G2, G3, or G4 grades using custom-trained YOLO classification model.'
  },
  {
    id: 'guava',
    name: 'Guava Quality Assessment',
    icon: '🍐',
    status: 'coming-soon',
    route: '/guava',
    description: 'Detect blemishes, size discrepancies, and freshness parameters in common Guava varieties.'
  },
  {
    id: 'banana',
    name: 'Banana Quality Assessment',
    icon: '🍌',
    status: 'coming-soon',
    route: '/banana',
    description: 'Grade bananas by ripeness indexing, spot percentage coverage, and bruising markers.'
  },
  {
    id: 'papaya',
    name: 'Papaya Quality Assessment',
    icon: '🍈',
    status: 'coming-soon',
    route: '/papaya',
    description: 'Determine ripeness zones and disease spot density measurements on Hawaiian and Solo papayas.'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<Prediction[]>(() => {
    const saved = localStorage.getItem('prediction_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse prediction history', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('prediction_history', JSON.stringify(history));
  }, [history]);

  const addPrediction = (pred: Omit<Prediction, 'id' | 'date'>) => {
    const newPrediction: Prediction = {
      ...pred,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleString()
    };
    setHistory((prev) => [newPrediction, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AppContext.Provider value={{ history, addPrediction, clearHistory, modules: INITIAL_MODULES }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
