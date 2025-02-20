import { View, Text, StyleSheet} from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text> Home Page </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});