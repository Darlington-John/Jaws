import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, TouchableWithoutFeedback, View} from "react-native";
import tw from "twrnc"
import Navbar from "../components/navbar";
import Slideshow from "../components/slide-show";
import planIcon from "./../assets/icons/note.svg"
import insightsData from "../components/data/insights";
import Card from "../components/cards";
import BottomBar from "../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import leftArrowIcon from './../assets/icons/leftArrow.svg'
export default function Insights() {
  const navigation = useNavigation();

  return (
    <View   style={tw `w-full  overflow-hidden flex-1 bg-[#fff]` }>
             <StatusBar style="auto" />
<Navbar title="Insights"

Icon={planIcon} back=" "/>

<View style={tw` flex-1`}>
  <ScrollView style={[tw`flex-col gap-8    flex-1    overflow-scroll p-4 pb-36`, {maxHeight: '100vh'}]} >
{insightsData.map((data, index)=>(

<Card insightCard=" "  data={data} {...data} key={index}/>

  ))
}
</ScrollView>
</View>
<BottomBar/>
 </View>
  );
}

