import { View, Text, StyleSheet} from "react-native";
import { UserProfile } from "../../screens/profile";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});