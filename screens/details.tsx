import { useRoute } from "@react-navigation/native";
import slideData from "../components/data/slide";
import { Button, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import tw from 'twrnc'
import { ResizeMode, Video } from "expo-av";
import { useNavigation } from '@react-navigation/native';

const Details = () => {
    const route = useRoute();
    const { exerciseId} = route.params;
    const exercise = slideData
    .flatMap((duration) => duration.days)
    .flatMap((day) => day.exercises)
    .find((ex) => ex.id === exerciseId);
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.goBack(); // Go back to the previous screen
    };
    return (<View style={tw` w-full p-5  gap-6 box-border h-full justify-between`}>
        <View style={tw`gap-3 relative box-border`}>
<Text style={tw`text-xl font-semibold`}>
    Details
</Text>
<View style={tw`w-full bg-[#E8F0FA]`}>
<Video source={{ uri: exercise.exercise }}   resizeMode={ResizeMode.COVER}

  isLooping   isMuted  shouldPlay={true}   style={tw` w-full  h-full `} videoStyle={{position: 'static', height: '50vh' }}/>
</View>
        </View>
        <View style={tw`gap-4`}>
         <Text style={tw`text-[22px] font-bold`}>
            {exercise.title}
         </Text>
         <View style={tw` flex-row items-center justify-between`}>
         <Text style={tw`text-base font-semibold`}>
           Duration
         </Text>
         <Text style={tw`text-base font-semibold`}>
            {exercise.duration}
         </Text>
         </View>
         <View  style={tw`text-base gap-4 `}>
<Text>
    {exercise? exercise.tip1 : ''}
</Text>
<Text>
    {exercise? exercise.tip2 : ''}
</Text>
         </View>
         </View>
         <TouchableWithoutFeedback onPress={handlePress} >
      <View style={tw   ` bg-[#000]  text-[#fff] text-bold   bottom-0 w-full p-3 rounded-md`}>
        <Text  style={tw   `  text-[#fff] font-semibold  text-center text-xl`}>Close</Text>
      </View>
      </TouchableWithoutFeedback>
    </View>  );
}
 
export default Details;