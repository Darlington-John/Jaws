import { Image, View } from "react-native";

import manImg from './../assets/images/man.png'
import gifImg from './../assets/images/dual.gif'

import tw from 'twrnc'
const Loader = () => {
 

    return (    <View style={[ tw `items-center w-full `,{postion: 'relative', height: '100vh', overflow: 'hidden' }]}>
    <Image
               source={manImg}
               style={{ width: '100%', height: '100vh', resizeMode: 'cover', overflow: 'visible',  postion: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 1}}
             />
               <Image
               source={gifImg}
               style={{ width: 50, height: 50, 
                 // resizeMode: 'cover',
                overflow: 'visible',  postion: 'relative',  zIndex: 2, bottom: 70}}
             />
    </View>);
}
 
export default Loader;