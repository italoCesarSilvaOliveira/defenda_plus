import { useState } from "react";
import { Stack } from "expo-router";
import  Login  from "../screens/LoginTeste/index";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  if (!isLoggedIn) {
    return <Login />; 
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notification"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
