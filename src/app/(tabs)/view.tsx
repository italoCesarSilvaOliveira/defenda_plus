import { View, Text, StyleSheet } from "react-native";
import { HeaderComponent } from "../components/index";
import { TelaView } from "../components/TelaView";
import { SemInfo } from "../components/SemView";
import { getControle } from '../../controle';
import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import React from "react";

export default function ViewPage() {
  const [controle, setControle] = useState<boolean>(false);

  // Recarrega a tela sempre que ela for focada
  useFocusEffect(
    React.useCallback(() => {
      setControle(getControle()); // Atualiza o valor de controle
    }, [])
  );

  return (
    <View style={styles.container}>
      <HeaderComponent />
      {controle ? <TelaView /> : <SemInfo />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightpink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
