import React from 'react';
import { useFonts } from 'expo-font';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';

import { 
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_500Medium  
} from '@expo-google-fonts/poppins';

import { 
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium
 } from '@expo-google-fonts/roboto';

 
export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_500Medium
  })

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>

    </ThemeProvider>
  );
}

