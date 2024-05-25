import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"




import markIcon from './../assets/icons/mark.svg'
import slideData from './data/slide';
import { useProgress } from './context';


const Slideshow = (props: any) => {
  const navigation = useNavigation();
  const { dailyRoutineCompletionStatus , storeDailyRoutineCompletion} = useProgress();

  
  
  
  
  const handleDayPress = (dayIndex) => {
    
    navigation.navigate('Plan', { planId: slideData[0].days[dayIndex].id });
  
    
    
    setTimeout(() => {
      storeDailyRoutineCompletion(dayIndex, true);
    }, 300000); 
  };
  return (
    <View style={tw ` items-start w-full`}>
   
    <View   style={tw `flex-1  w-full`}>

      <View
        style={tw `flex-1 items-start  gap-5 w-full `}

      

      >  <ScrollView style={[tw`w-full pb-[160px] px-3`, {maxHeight: '100vh'}]} >
 {slideData.map((slide, index) => (

        <View style={tw`flex-col gap-4`} key={index} >
          <View style={[tw`flex-1  relative`]}>
          
            <Image
              source={slide.heroUri}
              style={{ width: '100%', height: 250, resizeMode: 'contain', overflow: 'visible' }}
            />
         
          </View>
          <View style={tw `w-full gap-2`}>
          {slide.days.map((day, dayIndex) => (
            
            <TouchableOpacity onPress={() => handleDayPress(dayIndex)}     key={dayIndex}>
  <View style={tw`p-4 justify-between items-center bg-[#E8F0FA] rounded-md w-full flex-row`}      >
    <Text style={tw`text-xl font-semibold `}>
      Day {dayIndex + 1}
    </Text>

    <Text style={tw`text-xl font-semibold `}>


 {dailyRoutineCompletionStatus[dayIndex] && (
              <Image source={markIcon} style={tw`w-5 h-5`} />
            )}
    </Text>
  </View>
  </TouchableOpacity>
))}
</View>
        </View>

      ))}
</ScrollView>
      </View>

    </View>
    </View>
  );
};



export default Slideshow;