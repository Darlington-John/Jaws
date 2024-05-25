import React from "react";
import { Image, View,  Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';

import planningIcon from './../assets/icons/planning.svg';
import planningWhiteIcon from './../assets/icons/planning-white.svg';
import bookIcon from './../assets/icons/black.svg';
import bookWhiteIcon from './../assets/icons/blackActive.svg';

import { useNavigation, useRoute } from "@react-navigation/native";
const BottomBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const currentLink = route.name;

    const links = [
        {
            id: 1,
            icon:planningWhiteIcon ,
            activeIcon:planningIcon ,
            link: 'Plan',
            url: 'Home'
        },
        {
            id: 2,
            icon: bookIcon,
              activeIcon:  bookWhiteIcon,
            link: 'Insight',
            url: 'Insights'
        },

    ];

    return (
        <View style={[tw` px-5 py-3 bg-[#ffffff] items-center justify-between flex-row  bottom-[0%] left-0 right-0 z-50  `, { position: 'fixed',   }]}>
            {links.map((data, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate(data.url)}>
                    <View style={tw`flex items-center `}>
                        <Image source={currentLink === data.url ? data.icon : data.activeIcon}  style={ tw` w-5  h-5`}/>
                        <Text style={currentLink === data.url ? tw`text-sm  font-semibold` : tw`text-sm`}>{data.link}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default BottomBar;
