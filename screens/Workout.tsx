import React, { useState, useEffect , useRef} from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Button, Animated, Dimensions } from 'react-native';
import slideData from '../components/data/slide';
import tw from 'twrnc';
import pauseIcon from './../assets/icons/pause.svg';
import leftIcon from './../assets/icons/left.svg';
import leftArrowIcon from './../assets/icons/leftArrow.svg';
import rightIcon from './../assets/icons/right.svg';
import rightWhiteIcon from './../assets/icons/rightWhite.svg';
import leftDisIcon from './../assets/icons/leftDis.svg';
import rightDisIcon from './../assets/icons/rightDis.svg';
import { Audio, ResizeMode, Video } from 'expo-av';
import resultImg from './../assets/images/result.png'
import modalImg from './../assets/images/medal.png'
import frameImg from './../assets/images/frame.png'
import { useNavigation } from "@react-navigation/native";
import ding from "./../assets/music/ding.mp3";
import { useProgress } from '../components/context';
export const Workout = ({ route }) => {
  const navigation = useNavigation();
  const { planId } = route.params;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const exercises = slideData.flatMap(duration => duration.days).find(b => b.id === planId).exercises;

  const [currentExercise, setCurrentExercise] = useState(exercises[currentExerciseIndex]);
  const totalExercises = exercises.length;

  const [isPaused, setIsPaused] = useState(false);

  const [isResting, setIsResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(30); 
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const [isGetReady, setIsGetReady] = useState(true);
    const [seconds, setSeconds] = useState(10);
    const [restOpacity] = useState(new Animated.Value(0));
const { storeDailyRoutineCompletion} = useProgress();

const soundObject = new Audio.Sound();
const playSound = async () => {
  try {
    await soundObject.loadAsync(ding);
    await soundObject.playAsync();
  } catch (error) {
    console.error('Error playing sound: ', error);
  }
};
    useEffect(() => {
      if (isResting) {
        fadeInRestView();
      } else {
        fadeOutRestView();
      }
    }, [isResting]);
    useEffect(() => {
      if (allExercisesCompleted) {
        fadeInRestView();
      } else {
        fadeOutRestView();
      }
    }, [allExercisesCompleted]);
    const fadeInRestView = () => {
      Animated.timing(restOpacity, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start();
    };
  
    const fadeOutRestView = () => {
      Animated.timing(restOpacity, {
        toValue: 0,
        duration: 500, 
        useNativeDriver: true,
      }).start();
    };
    useEffect(() => {
      let timer;
    
      if (!isResting && !isPaused) {
        timer = setInterval(() => {
          setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0));
        }, 1000);
      }
    
      return () => clearInterval(timer);
    }, [isResting, isPaused]); 
  
  useEffect(() => {
    if (seconds === 0 && !isGetReady) { 
      if (currentExerciseIndex < totalExercises - 1) { 
        setIsResting(true); 
        setRestSeconds(30); 
playSound()
      } else {
        goToNextExercise(); 
      }
    }
  }, [seconds, isGetReady, currentExerciseIndex, totalExercises]);
  
  useEffect(() => {
    let restTimer;
  
    if (isResting) {
      restTimer = setInterval(() => {
        setRestSeconds(prevRestSeconds => Math.max(prevRestSeconds - 1, 0));
      }, 1000);
    }
  
    if (restSeconds === 0 && isResting) {
      clearInterval(restTimer);
      setIsResting(false);
      goToNextExercise();
    }
  
    return () => clearInterval(restTimer);
  }, [isResting, restSeconds]);

  const startExerciseTimer = () => {
    setSeconds(60); // Set initial countdown seconds
    setIsGetReady(false);
  
    // Play sound immediately
 playSound();
  };
  const handleTogglePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const barWidth = (seconds / 60) * 100;


  const goToNextExercise = (dayIndex) => {
    if (!isResting && currentExerciseIndex < totalExercises - 1) {
      setIsResting(true);
      setRestSeconds(30); // Reset rest countdown time
    } else {
      // Update data on every exercise completion
      playSound();
      if (currentExerciseIndex >= totalExercises - 1) {
        setAllExercisesCompleted(true);
        storeDailyRoutineCompletion(dayIndex, true);
        setAllExercisesCompleted(true);
      } else {
        setCurrentExerciseIndex(prevIndex => prevIndex + 1);
        setCurrentExercise(exercises[currentExerciseIndex + 1]);
        startExerciseTimer();
      }
    }
  };


  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) { 
      setCurrentExerciseIndex(prevIndex => prevIndex - 1);
      setCurrentExercise(exercises[currentExerciseIndex - 1]); 
      startExerciseTimer(); 
    }
  };
  const skipRest = () => {
    if (isResting) {
      setIsResting(false); 
      goToNextExercise(); 
    }
};

  const add20SecondsToRest = () => {
    setRestSeconds(prevRestSeconds => prevRestSeconds + 20); 
  };
  const [modalVisible, setModalVisible] = useState(false);
  const   plan = slideData
    .flatMap((duration) => duration.days)
    .find((b) => b.id === planId);
    const sound = useRef(new Audio.Sound());

  
  return (
    <View style={tw` w-full bg-[#000000] h-full justify-between `}>
          {/* <Animated.View style={[tw`flex-1 justify-between  py-2 px-0  bg-[#000]  h-full`, { opacity: restOpacity }]}></Animated.View> */}
      {allExercisesCompleted ? (
  <Animated.View style={[tw`h-full bg-[#000000]  flex-col gap-6 relative justify-between`, {opacity: restOpacity}]} >

 <View style={tw`relative  pb-14 `}>
 <View style={[tw `w-full    absolute bottom-0 z-20  h-full`, { background: `linear-gradient(rgba(0, 0, 0, 0.68) 20%, rgb(0 0 0 / 66%) 30%, rgb(0 0 0 / 89%) 80%)`, 
}]}>

 </View>
 <Image source={resultImg}       style={{ width:'100%', height: 270, resizeMode: 'cover', overflow: 'visible', position: 'relative z-10' }}/>
<View style={tw`relative z-30 `}>
<View style={tw `w-full absolute bottom-[-80px] mx-auto  z-30 `}>
<Text style={tw`text-4xl text-center  font-bold italic text-[#e4d091]`}>
Day {plan.id}  completed
</Text>
<Image source={modalImg}       style={{ width: '100%', height: 200, resizeMode: 'contain', overflow: 'visible', position: 'relative z-10' }}/>
</View>
</View>
</View>
<View style={tw`relative items-center justify-center`}>
<Image source={frameImg}       style={{ width: '100%', height: 100, resizeMode: 'cover', overflow: 'visible', position: 'absolute' ,}}/>
<Text  style={tw`relative z-20  text-[#fff] text-center   px-5 text-xl`}>
  Don't watch the clock, do what it does. Keep  going
</Text>
</View>
<View style={tw`relative px-3 justify-center items-center gap-3 py-3`}>
<TouchableWithoutFeedback  onPress={() => navigation.navigate('Home')}>
  <View style={tw`w-full py-5 rounded-md bg-[#93ea17]`}>
<Text style={tw`text-[22px]  font-semibold text-center  text-[#fff]`}>
  Finished
</Text>
  </View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={() => navigation.navigate('Insights')}>
  <View style={tw`w-full py-5 rounded-md bg-[#313131]`}>
<Text style={tw`text-[22px] font-semibold text-center text-[#fff] `}>
View Insights
</Text>
  </View>
</TouchableWithoutFeedback>
</View>
  </Animated.View>
) : (
  <View style={tw`px-4 py-3 w-full bg-[#000000] h-full justify-between`}>
      {isGetReady ? (
   <View style={tw`flex-1 justify-between`}>
    <View  style={tw`  gap-3`}>
    <View style={[tw` z-50 bg-[#ffffff85]  rounded-full p-0 self-start`, ]}>
   <TouchableWithoutFeedback   onPress={() => navigation.goBack()}>

<Image 
            source={leftArrowIcon}
            style={tw `w-7 h-7 `}
          />

</TouchableWithoutFeedback>

</View>
   <View style={tw`relative bg-[#fff] py-4 px-1 items-center justify-center rounded-xl gap-3`}>
 
     <Video
       source={{ uri: exercises[0].exercise }}
       resizeMode={ResizeMode.COVER}
       isLooping
       isMuted
       shouldPlay={true}
       style={tw`w-full h-full rounded-lg`}
       videoStyle={{ position: 'static' , height: '50vh'}}
     />
   </View>
   </View>
   <View style={tw`gap-4`}>
     <Text style={tw`text-xl font-semibold text-[#fff] text-center`}>{currentExercise.title}</Text>
     <Text style={tw`text-5xl font-bold text-[#fff] text-center italic`}>Get ready</Text>
   </View>
   <TouchableWithoutFeedback onPress={startExerciseTimer}>
   <View style={tw`gap-4 flex-row items-center justify-between bg-[#C0F950] p-6 rounded-2xl relative overflow-hidden`}>
<Text style={tw`font-semibold  text-center text-xl`}>Start Now</Text>
     <Image source={rightIcon} style={tw`w-6 h-6`} />
   </View>
   </TouchableWithoutFeedback>
 </View>
      ) : (
        <>
        {isResting ? (
          <Animated.View style={[tw`flex-1 justify-between  py-2 px-0  bg-[#000]  h-full`, { opacity: restOpacity }]}>
            <View style={tw`flex-1 gap-4`} >
 <View style={tw `items-center gap-[6px]`} >
  <Text  style={tw`text-[#ccc]  text-xl`}>
    Next  {currentExerciseIndex + 2}/{totalExercises}
  </Text>
  <View style={tw`flex-row gap-[12px]  items-center`}>
  <Text style={tw`font-semibold text-[#fff] text-[22px]`}>
  { exercises?.[currentExerciseIndex + 1]?.title || '' }
</Text>
<Text style={tw`text-[#ccc] text-xl`}>

{ exercises?.[currentExerciseIndex + 1]?.duration|| '' }
</Text>
</View>
</View>
<Video
            source={{ uri:  exercises?.[currentExerciseIndex + 1]?.exercise || ''  }}
            resizeMode={ResizeMode.COVER}
            isLooping
            isMuted
            shouldPlay={true}
            style={tw`w-full  rounded-lg`}
            videoStyle={{ position: 'static' , borderRadius: 14, height: '50vh'}}
          />
            </View>
            <View style={tw`  gap-[12px]   items-center`}>
<Text style={tw`text-[#fff]  font-semibold text-[32px] leading-none`}>
Take a rest
</Text>
<Text style={tw`text-[#fff]  font-bold text-[56px] leading-none `}>
{formatTime(restSeconds)}
</Text>
<View style={tw`flex-row  gap-4 flex-wrap`}>
<TouchableWithoutFeedback  onPress={add20SecondsToRest}>
  <View style={tw`bg-[#ooo] rounded-lg border border-[#ccc] border-2 py-2 px-8 `}>
<Text style={tw`font-semibold  text-xl text-[#fff] `}>
+20s
</Text>
</View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback  onPress={skipRest}>
  <View style={tw`bg-[#fff] rounded-lg border border-[#fff] border-2 py-2 px-8 `}>
<Text style={tw`font-semibold  text-xl text-[#000]`}>
SKIP
</Text>
</View>
</TouchableWithoutFeedback>
</View>
            </View>
          </Animated.View>
        ): (
                  <View style={tw`flex-1 justify-between h-full pt-[40px] relative`}>
                    <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} style={[tw`top-0 left-0 z-40  bg-[#000] h-full`, {position: 'absolute'}]}>
          <View  style={[tw`  bg-[#000000db] h-full items-center justify-center  gap-6 px-4`, { backgroundColor: '#000000db'}]}>
            <View style={tw``}>
<Text style={tw`italic  text-4xl text-[#fff] font-semibold leading-relaxed`}>
Why give up?
</Text>
<Text style={tw` text-[17px]  text-[#fff]`}>
This will help us know you better and provide the workout that is more suitable for you.
</Text>
            </View>
            <View style={tw` gap-4 w-full`}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Plan', { planId: plan.id })}>
  <View style={tw`w-full py-6 rounded-md bg-[#ffffff29]`}>
<Text style={tw`text-[22px] font-semibold text-start px-6 text-[#fff] `}>
Just take a look
</Text>
  </View>
</TouchableWithoutFeedback>
            <TouchableWithoutFeedback      onPress={() => {setModalVisible(!modalVisible);
                handleTogglePause();
              }}  >
  <View style={tw`w-full py-6 rounded-md bg-[#93ea17]`}>
<Text style={tw`text-[22px]  font-semibold text-start px-6  text-[#000]`}>
Resume
</Text>
  </View>
</TouchableWithoutFeedback>

            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Plan', { planId: plan.id })} >
            <View style={tw`flex-row gap-2  self-end items-center`}>
            <Text style={tw`text-[22px] font-semibold  text-[#fff] `}>
Quit
</Text>
<Image  source={rightWhiteIcon}  style={tw `w-[30px]  z-30 h-[30px] `}/>
            </View>
            </TouchableWithoutFeedback>
          </View>

                    </Modal>
<View style={[tw`absolute top-[12px] left-4 z-50 bg-[#ffffff85]  rounded-full p-0`, {position: 'fixed'}]}>
<TouchableWithoutFeedback onPress={() => {
  setModalVisible(!modalVisible);
  handleTogglePause();
}} >
 <Image  source={leftArrowIcon}  style={tw `w-[30px]  z-30 h-[30px] `}/>
 </TouchableWithoutFeedback>

</View>
        <View style={tw`relative bg-[#fff] py-4 px-1 items-center justify-center rounded-xl`}>
          <View style={tw`flex-row justify-between w-full items-center px-2`}>
            <Text style={tw`text-base font-semibold`}>{formatTime(seconds)}</Text>
            <Text style={tw`text-base font-semibold`}>{currentExerciseIndex + 1}/{totalExercises}</Text>
          </View>
          <Video
            source={{ uri: currentExercise.exercise}}
            resizeMode={ResizeMode.COVER}
            isLooping
            isMuted
            shouldPlay={true}
            style={tw`w-full h-full rounded-lg`}
            videoStyle={{ position: 'static', height: '50vh' }}
          />
        </View>
        <View style={tw`gap-4`}>
          <Text style={tw`text-xl font-semibold text-[#fff] text-center`}>{currentExercise.title }</Text>
          <Text style={tw`text-5xl font-bold text-[#fff] text-center`}>{formatTime(seconds)}</Text>
        </View>
        <View style={tw`gap-4 flex-row items-center justify-between bg-[#C0F950] p-6 rounded-2xl relative overflow-hidden`}>
          <View style={[tw`h-full absolute bg-[#999999] top-0 right-0 ease-out duration-300`, { width: `${barWidth}%` }]}></View>
          {currentExerciseIndex === 0 ? (
       <TouchableWithoutFeedback  
       >
       <Image source={leftDisIcon} style={tw`w-6 h-6`} />
       </TouchableWithoutFeedback>
) : (
  <TouchableWithoutFeedback  onPress={handlePreviousExercise} 
  >
  <Image source={leftIcon} style={tw`w-6 h-6`} />
  </TouchableWithoutFeedback>
)}
   
          {isPaused ? (    <TouchableWithoutFeedback  onPress={handleTogglePause}>
        <Image source={rightIcon} style={tw`w-6 h-6`} />
  
        </TouchableWithoutFeedback>) : (    <TouchableWithoutFeedback  onPress={handleTogglePause}>
        <Image source={pauseIcon} style={tw`w-5 h-5`} />
  
        </TouchableWithoutFeedback>)}

  <TouchableWithoutFeedback onPress={goToNextExercise}>
  <Image source={rightIcon} style={tw`w-6 h-6`} />
  </TouchableWithoutFeedback>

        
        </View>
      </View>)}
</>
      )}
  </View>
)}

    </View>
  );
};
const { width } = Dimensions.get('window');