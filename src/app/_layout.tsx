import {Stack} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";


SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index"/>
        </Stack>
    );
}
