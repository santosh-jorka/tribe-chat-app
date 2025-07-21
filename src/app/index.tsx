import { Text, View } from "react-native";
import{SplashScreen} from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useParticipantStore } from "@/store/useParticipantStore";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "expo-router";


SplashScreen.preventAutoHideAsync();
export default function Index() {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const initializeData = async () => {
    console.debug('Initializing data');
    try{
      const [participantsResponse, messageResponse]  = await Promise.all([
        fetch('https://dummy-chat-server.tribechat.com/api/participants/all'),
         fetch('https://dummy-chat-server.tribechat.com/api/messages/all'),
      ]);

      const [participants, messages] = await Promise.all([
        participantsResponse.json(),
        messageResponse.json(), 
      ]);
      useParticipantStore.getState().setParticipants(participants);
      useChatStore.getState().setMessages(messages);
    }catch(error){
      console.error('Error initializing data:', error);
    }finally{
      setIsLoading(false);
    }
  }
  
  const initializeApp = async () => {
    console.debug('Initializing app');
    try{
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch('https://dummy-chat-server.tribechat.com/api/info')
      const {sessionUuid, appVersion} = await response.json();

      const storedSessionUuid = await AsyncStorage.getItem('sessionUuid');

      if (storedSessionUuid !== sessionUuid){
        console.debug('Session UUID mismatch, clearing storage');
        await AsyncStorage.clear();
        await AsyncStorage.setItem('sessionUuid', sessionUuid);
        await initializeData();
      }
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


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash screen</Text>
    </View>
  );
}