import { Image, Text,  View , TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
const Card = (props: any) => {
    const navigation = useNavigation();
    return (  <>
    {props.insightCard && (
       <TouchableOpacity
        onPress={() => navigation.navigate('Article', { insightId: props.id })}
    
    >
        <View style={tw` w-full relative rounded-md overflow-hidden  my-4`} >
<Image source={props.image} style={tw `w-full  h-[310px]`}/>
<View style={tw` w-full p-4 bg-[#fff] absolute bottom-0 left-0`}>
<Text style={tw ` text-[16px] font-semibold` }>
{props.insights}
</Text>
</View>
        </View>
 </TouchableOpacity>
    )}
    </>);
}
 
export default Card;