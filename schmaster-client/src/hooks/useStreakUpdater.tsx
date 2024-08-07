// lib/useStreakUpdater.ts
import { useEffect } from 'react';
import { addStreak } from '../lib/calls';

const useStreakUpdater = () => {
  useEffect(() => {
    const updateStreak = async () => {
      await addStreak();
    };

    // Initial call to update streak
    updateStreak();
    
    // Set up an interval to update streak daily
    const interval = setInterval(updateStreak, 24 * 60 * 60 * 1000);

    
    return () => clearInterval(interval);
  }, []);
};

export default useStreakUpdater;
