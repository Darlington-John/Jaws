
import { Text, View,   Image, TouchableWithoutFeedback } from "react-native";
import leftArrowIcon from './../assets/icons/leftArrow.svg'
import tw from "twrnc"
import { useNavigation } from '@react-navigation/native';
export default function Navbar(props: any) {
  const navigation = useNavigation();

  return (
    <View  style={tw ` items-center justify-between w-full flex-row p-3  border border-bottom border-[#f1efef]  border-2`}>
<View style={tw `gap-3 flex-row items-center`}>
{props.back && (
  <TouchableWithoutFeedback   onPress={() => navigation.goBack()}>

  <Image 
              source={leftArrowIcon}
              style={tw `w-7 h-7 `}
            />

</TouchableWithoutFeedback>
)}
<Text style={tw `text-[26px] font-bold`}>
{props.title}
</Text>
</View>
<Image source={props.Icon} style={tw `w-6`} />
    </View>
  );
}


