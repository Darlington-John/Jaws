import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import IntroData from "./data/intro";
import tw from 'twrnc'
const WelcomeSwiper = (props: any) => {
  const {hideSwiper} =   props;
    return ( 
        <SwiperFlatList     autoplayDelay={3}     style={{height: height}} autoplayLoop={true} >

        {IntroData.map((data, index) => (
            
  <View style={tw `w-full  h-full  items-center justify-between `} key={index}>

      <Image 
                source={data.Image}
                style={{ width: width, height: '60vh', 
                  resizeMode: 'cover',
                 overflow: 'visible',  postion: 'relative',  zIndex: 2}}
              />
  <View style={[tw `w-full  bg-[#fff] items-center justify-between  p-3  gap-[40px]  flex-1`, {maxWidth: width}]}>
  <View>
  
  <Text style={tw` font-semibold text-[24px] text-center `}>
  {data.feature}
  </Text>
  <Text style={tw` text-[18px] text-center`}>
  {data.content}
  </Text>
  </View>

  <TouchableWithoutFeedback onPress={hideSwiper} >
  <View style={[tw   ` bg-[#000]  text-[#fff] text-bold    w-full p-3 rounded-md   `, ]}>
          <Text  style={tw   `  text-[#fff] font-semibold  text-center text-xl`}>Continue</Text>
        </View>
  </TouchableWithoutFeedback>
  </View>
  
  </View>
  ))}
  
    </SwiperFlatList>
     );
}
 
export default WelcomeSwiper;
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');