import { useContext } from 'react';
import { MatchContext } from '../contexts/MatchContext';

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatch must be used within a MatchProvider');
  return context;
};
