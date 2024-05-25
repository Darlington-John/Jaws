import { useRoute } from "@react-navigation/native";
import * as React from 'react';
import { useRef, useState} from 'react';

import { Image, ImageBackground, Text, View , StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import slideData from "../components/data/slide";
import Swiper from 'react-native-swiper';
import tw from 'twrnc'
import leftIcon from './../assets/icons/leftArrow.svg'
import insightsData from "../components/data/insights";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useNavigation } from "@react-navigation/native";
export const Article = () => {
    const route = useRoute();
    const { insightId} = route.params;
    const insight = insightsData.find((item) => item.id === parseInt(insightId, 10));
    
    const   art = insightsData
        .flatMap((article) => article.slider)
        .find((b) => b.id === insightId);
        const navigation = useNavigation();
    return (
      <View style={tw `w-full h-full   relative`} >
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Insights')}>
 <Image  source={leftIcon}  style={tw `w-10 absolute z-30 h-10 top-4 left-4`}/>
 </TouchableWithoutFeedback>
        <SwiperFlatList   showPagination autoplay autoplayDelay={6}     >
      
        {insight.slider.map((slide, index) => (
      
<View style={[ tw `justify-center`, { backgroundColor: 'transparent', width: width }]} key={index} >
<Image
          key={index}
          source={slide.art}
          style={[tw `absolute top-0`, { width: width, height: height }]} // Adjust width and height as needed
        />
        <Text style={tw`relative z-30 text-4xl text-center font-semibold  pt-16`}>
{slide? slide.feature: ''}
                        </Text>
                        <View style={tw`flex flex-col   p-4 relative z-30  pt-10`}>
<Text  style={tw `text-[32px] font-semibold`}>
{slide? slide.header: ''}
</Text>
<Text  style={tw `text-xl font-medium `}>
{slide? slide.body: ''}
</Text>
                        </View>
      </View>
      ))}


    </SwiperFlatList>


</View>
    );
  };

  const { width } = Dimensions.get('window');
  const { height } = Dimensions.get('window');
