import { useState } from "react";
import { Stack } from "expo-router";
import { Login } from "../screens/login";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />; 
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
