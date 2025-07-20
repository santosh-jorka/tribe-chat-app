import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useEffect(()=>{
    setTimeout(()=>{ SplashScreen.hideAsync()},2000);
  },[])
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Chats", headerTitleAlign: 'center' }}/>
        <Stack.Screen 
          name="chatScreen" 
          options={({ route }) => ({
            title: route?.params?.name || 'Chat',
            headerTitleAlign: 'center',
          })}
        />
      </Stack>
      );
}
