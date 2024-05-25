import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View }  from "react-native";
import slideData from "../components/data/slide";
import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc'
import { ResizeMode, Video } from "expo-av";
import leftIcon from './../assets/icons/leftArrow.svg'
export const Plan = () => {
    const route = useRoute();
    const { planId} = route.params;
 

const   plan = slideData
    .flatMap((duration) => duration.days)
    .find((b) => b.id === planId);
    const exerciseCount = plan.exercises.length;
    const navigation = useNavigation();
    
    const startWorkout = () => {
      navigation.navigate('Workout', { planId });
    };
 

  

    return (
      <View  style={tw` flex-col  items-start relative   h-screen`}>
<View style={[tw`absolute top-6 left-4 z-50 bg-[#fff]  rounded-full p-2`, {position: 'fixed'}]}>
<TouchableWithoutFeedback onPress={() => navigation.navigate('Home')} >
 <Image  source={leftIcon}  style={tw `w-10  z-30 h-10 `}/>
 </TouchableWithoutFeedback>

</View>
        <ScrollView>
        <View  style={tw    `relative z-10`}>
 <Image source={plan.courseUri}       style={{ width: '100vw', height: 270, resizeMode: 'contain', overflow: 'visible' }}/>
 <View  style={tw    `absolute bottom-5  z-30 gap-3  px-3`}>
 <Text style={tw `text-4xl font-bold  italic`}>
  Day {plan.id}
 </Text>
 <Text  style={tw `text-xl   italic`}>
Sharpened Jawline
 </Text>
 </View>
 <View style={[tw `w-full    absolute bottom-0 z-20  h-[140px]`, { background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 40%)`,
}]}>
 </View>
 </View>
 <View style={tw `items-start  w-full`}>

  <View style={tw`px-3  flex-row  divide-x divide-[#ccc]  bg-[#fff] w-full gap-8 py-3`}>
<View style={tw` items-start `}>
<Text style={tw`text-xl  font-semibold`}>
  {exerciseCount}
</Text>
<Text style={tw`text-sm text-[#727272] w-full`}>
  Exercises
</Text>
</View>
<View style={tw` items-start `}>
<Text style={tw`text-xl  font-semibold`}>{exerciseCount}</Text>
<Text style={tw`text-sm text-[#727272]`}>Minutes</Text>
</View>
  </View>
  <TouchableWithoutFeedback onPress={startWorkout}  style={[tw` bottom-0`]}
 >
      <View style={[tw   ` bg-[#000]  text-[#fff] text-bold    w-full p-3    bottom-0`, ]}>
        <Text  style={tw   `  text-[#fff] font-semibold  text-center text-xl`}>Start</Text>
      </View>
      </TouchableWithoutFeedback>
<View  style={tw` w-full bg-[#fff]  py-2`}>
<Text style={tw`text-xl  font-semibold px-3 `}>
  Exercises
</Text>
</View>

<ScrollView style={[tw ` w-full  w-full p-4 bg-[#ffooff] gap-4 `,{maxHeight: '400px'}]}>
  {plan.exercises.map((data, index)=> (
    <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Details', { exerciseId: data.id })} >
    <View  style={tw `  flex-row gap-3 items-center w-full`}>
{    data.exercise ?(  <Video  source={{ uri: data.exercise}}   resizeMode={ResizeMode.COVER}
  isLooping   isMuted  shouldPlay={true}   style={tw` w-20 h-20  `} videoStyle={{position: 'static', }} onLoad={() => console.log('Video loaded:', data.exercise)}   onError={(error) => console.error('Video Error:', error)}/>)  : null}

<View style={tw``}>
<Text style={tw`text-base  `}>{data.title}</Text>
<Text style={tw `text-sm text-[#727272]`}>{data.duration}</Text>
</View>
    </View>
    </TouchableWithoutFeedback>
  ))}
  </ScrollView>

 </View>
 </ScrollView>

</View>
    );
  };