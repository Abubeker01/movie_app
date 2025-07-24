import { LogBox } from "react-native";



import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
    return(
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

    <Stack.Screen name="movie[id]" options={{ headerShown: false }} />
  </Stack>
    );
}




LogBox.ignoreLogs([
  'Invalid prop `style` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.'
]);
