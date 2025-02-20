import { View, Text, StyleSheet} from "react-native";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text> Profile Page </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgreen",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});