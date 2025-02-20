import { View, Text, StyleSheet} from "react-native";

export default function ViewPage() {
  return (
    <View style={styles.container}>
      <Text> View Page </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightpink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});