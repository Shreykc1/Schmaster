// lib/useStreakUpdater.ts
import { useEffect } from 'react';
import { addStreak } from '../lib/calls';
import  Cookies  from 'js-cookie';
import { useUserContext } from '@/context/AuthContext';

const useStreakUpdater = () => {

  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    
    const updateStreak = async () => {
      await addStreak();
    };


    updateStreak();
    
    // Set up an interval to update streak daily
    const interval = setInterval(updateStreak, 24 * 60 * 60 * 1000);

    
    return () => clearInterval(interval);
  }, [isAuthenticated === true  ]);
};

export default useStreakUpdater;
