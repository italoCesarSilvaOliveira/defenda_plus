import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import { HeaderComponent } from "../components/index";
import { Home } from "../../screens/Home";
import React, { useState, useCallback } from "react";

export default function HomePage() {
  const [key, setKey] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1);
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent />
      <Home key={key} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
