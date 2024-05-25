import { Dimensions, Image, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import tw from 'twrnc'
import leftArrowIcon from './../assets/icons/leftArrow.svg'
import { featuresData } from "./data/features";
const HowItWorks = (props: any) => {
    const {hideSwiper, hideFirstTimeLoader} = props;
    return (
       
        <View style={tw `items-center justify-between h-full  w-full p-3`}>
            
<View style={tw `gap-[10px] w-full h-full`}>
   
<TouchableWithoutFeedback onPress={hideSwiper}>
  <View style={tw `bg-[#F2F5F7] rounded-lg ml-3 self-start p-0`}>

  <Image 
              source={leftArrowIcon}
              style={tw `w-7 h-7 `}
            />
  </View>
</TouchableWithoutFeedback>
<View style={tw`gap-4`}>
<ScrollView style={[tw ` w-full   gap-4`,{maxHeight: '100vh'}]}>
  {featuresData.map((data, index)=>(
    <View style={[tw `gap-[10px]  bg-[#fff] rounded-lg border border-2  border-[#f1f1f1]`, {maxWidth: width}]} key={index}>
<Text style={tw`text-[24px] font-semibold text-center py-2`}>

     {data.header}
      </Text>
      <Image 
              source={data.Image}
              style={{ width: '100%',  height: 330, 
                resizeMode: 'cover',
                overflow: 'visible',}}
            />
            <View style={[tw `p-3`, {maxWidth: width}]}>
              <Text style={tw`text-[22px] font-semibold text-center`}>
      {data.feature}
              </Text>
              <Text style={tw`text-[18px]  font-semibold    text-center`}>
     {data.content}
              </Text>
            </View>
            </View>
  ))}
</ScrollView>
</View>
</View>
<TouchableWithoutFeedback   style={[tw` `]}
  onPress={hideFirstTimeLoader}>
      <View style={[tw   ` bg-[#000]  text-[#fff] text-bold    w-full p-3 rounded-md  `, ]}>
        <Text  style={tw   `  text-[#fff] font-semibold  text-center text-xl`}>Let's start</Text>
      </View>
      </TouchableWithoutFeedback>
</View>
      );
}
const { width } = Dimensions.get('window');

export default HowItWorks;