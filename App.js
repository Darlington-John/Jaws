import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator , TransitionPresets} from "@react-navigation/stack";
import Home from "./screens/home";
import { useState, useEffect} from 'react';


import { Plan } from "./screens/plan";

import { Article } from "./screens/Article";

import Insights from "./screens/insights";
import Details from "./screens/details";
import { Workout } from "./screens/Workout";

import { ProgressProvider } from "./components/context";

const Stack = createStackNavigator();

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./components/loader";
import WelcomeSwiper from "./components/welcomeSwiper";
import HowItWorks from "./components/howItWorks";


export default function App() {
  const [showFirstTimeLoader, setShowFirstTimeLoader] = useState(false);
  const[ showSwiper, setShowSwiper] = useState(true);
  const [showAlwaysLoader, setShowAlwaysLoader] = useState(true);
  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (isFirstTime === null) {
          
          await AsyncStorage.setItem('isFirstTime', 'false');
          setShowFirstTimeLoader(true);
        } else {
          
          setShowFirstTimeLoader(false);
        }
      } catch (error) {
        console.error('Error checking first time:', error);
      }
    };

    checkFirstTime();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlwaysLoader(false); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  const hideFirstTimeLoader = () => {
    setShowFirstTimeLoader(false); 
  };
    const hideSwiper = () => {
      setShowSwiper(prevState => !prevState); 
  };

  return (
<ProgressProvider>
   {showAlwaysLoader? (
<Loader/>
  ) : ( <>
    {showFirstTimeLoader ? (<>      
    {showSwiper ?  (    
 <WelcomeSwiper hideSwiper={hideSwiper}/>
) : (
<HowItWorks hideSwiper={hideSwiper} hideFirstTimeLoader={hideFirstTimeLoader}/>

  ) }  
  </>) : (
  
      <NavigationContainer >
      <StatusBar style='auto' />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Insights"
          component={Insights}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Plan"
          component={Plan}
          options={({ route }) => ({ title: route.params.planId , headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: true,})}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          options={({ route }) => ({
            title: route.params.insightId,
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: true,
          })}
        />
              <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({ title: route.params.exerciseId , headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: true,})}
        />
        <Stack.Screen
  name="Workout"
  component={Workout}
  options={({ route }) => ({
    title: 'Workout', 
    headerShown: false, 
  })}
/>
      </Stack.Navigator>
    </NavigationContainer>

  )}
  </>
)}

    </ProgressProvider>
  );
}
