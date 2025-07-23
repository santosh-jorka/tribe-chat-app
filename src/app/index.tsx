import { Text, View } from "react-native";
import{SplashScreen} from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useParticipantStore } from "@/store/useParticipantStore";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "expo-router";
import dummyMessages from "../dummyMessages.json";
import {TMessage} from "@/types";


export default function Index() {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  const initializeData = async () => {
    console.debug('Initializing data');
    try{
      //const dummy: TMessage[] =  (dummyMessages as TMessage[]);
      const participantsResponse  = await fetch('https://dummy-chat-server.tribechat.com/api/participants/all');
      const messageResponse= await fetch('https://dummy-chat-server.tribechat.com/api/messages/latest');

      const participants = await participantsResponse.json();
      const messages = await messageResponse.json();
      //const messages = dummy;


      console.debug(messages.length);
      useParticipantStore.getState().setParticipants(participants);
      //console.debug(messages)
      useChatStore.getState().setMessages(messages.reverse());
    }catch(error){
      console.error('Error initializing data:', error);
    }finally{
      setIsLoading(false);
    }
  }

  const initializeApp = async () => {
    console.debug('Initializing app');
    try{
      const response = await fetch('https://dummy-chat-server.tribechat.com/api/info')
      const {sessionUuid, appVersion} = await response.json();

      const storedSessionUuid = await AsyncStorage.getItem('sessionUuid');

      if (storedSessionUuid !== sessionUuid){
        console.debug('Session UUID mismatch, clearing storage');
        await AsyncStorage.clear();
        await AsyncStorage.setItem('sessionUuid', sessionUuid);
        await initializeData();
      }
     await AsyncStorage.setItem('sessionUuid', "");
    }catch(error){
      console.error('Error initializing app:', error);
    }finally{
      setIsLoading(false);
      SplashScreen.hideAsync();

      router.replace('/chatScreen');
    }
  }

  useEffect(()=>{
    console.debug("👋 App is mounting");
    initializeApp();
  }, []);


  if (isLoading) return null;

  return null;
}