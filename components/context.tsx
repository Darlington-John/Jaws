import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext,  useEffect } from 'react';
import { Button, View } from 'react-native';
import slideData from './data/slide';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);
export const ProgressProvider = ({ children }) => {
  const [dailyRoutineCompletionStatus, setDailyRoutineCompletionStatus] = useState(Array(slideData.length).fill(false));
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);

  const storeDailyRoutineCompletion = async (dayIndex, isComplete) => {
    try {
      const updatedStatus = [...dailyRoutineCompletionStatus];
      updatedStatus[dayIndex] = isComplete;
      await AsyncStorage.setItem('dailyRoutineCompletionStatus', JSON.stringify(updatedStatus));
      setDailyRoutineCompletionStatus(updatedStatus);

      
      const allCompleted = updatedStatus.every(status => status);
      setAllExercisesCompleted(allCompleted);
    } catch (error) {
      console.error('Error storing daily routine completion:', error);
    }
  };

  useEffect(() => {
    const fetchDailyRoutineCompletion = async () => {
      try {
        const storedData = await AsyncStorage.getItem('dailyRoutineCompletionStatus');
        if (storedData) {
          setDailyRoutineCompletionStatus(JSON.parse(storedData));
          
          setIsDayCompleted(JSON.parse(storedData).some(status => status === true));
        }
      } catch (error) {
        console.error('Error fetching daily routine completion:', error);
      }
    };

    fetchDailyRoutineCompletion();
  }, []);

  
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };
    const handleClearData = async () => {
      await clearAsyncStorage();
      
    };
    
  

  return (
    <ProgressContext.Provider value={{dailyRoutineCompletionStatus, storeDailyRoutineCompletion, isDayCompleted, setIsDayCompleted, allExercisesCompleted, setAllExercisesCompleted, 
  }}>

      {children}
     {/* <Button title="Clear AsyncStorage" onPress={handleClearData} /> */}
    </ProgressContext.Provider>
  );
};
