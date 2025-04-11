
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface YoutubeApiContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isApiKeySet: boolean;
}

const YoutubeApiContext = createContext<YoutubeApiContextType | undefined>(undefined);

export const YoutubeApiProvider = ({ children }: { children: ReactNode }) => {
  // Try to get API key from local storage if available
  const [apiKey, setApiKeyState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('youtube_api_key') || '';
    }
    return '';
  });

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('youtube_api_key', key);
    }
  };

  return (
    <YoutubeApiContext.Provider value={{ 
      apiKey, 
      setApiKey, 
      isApiKeySet: apiKey.length > 0
    }}>
      {children}
    </YoutubeApiContext.Provider>
  );
};

export const useYoutubeApi = (): YoutubeApiContextType => {
  const context = useContext(YoutubeApiContext);
  if (context === undefined) {
    throw new Error('useYoutubeApi must be used within a YoutubeApiProvider');
  }
  return context;
};
