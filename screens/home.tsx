import { StatusBar } from "expo-status-bar";
import { Button, TouchableWithoutFeedback, View} from "react-native";
import tw from "twrnc"
import Navbar from "../components/navbar";
import Slideshow from "../components/slide-show";
import planIcon from "./../assets/icons/note.svg";
import BottomBar from "../components/bottomBar";
import { Audio } from "expo-av";

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function Home() {

  return (

    <View   style={tw `w-full relative bg-[#fff]`}>
             <StatusBar style="auto" />
<Navbar title="Jawline Exercises"

Icon={planIcon}/>

<Slideshow/>

<BottomBar/>
    </View>

  );
}

