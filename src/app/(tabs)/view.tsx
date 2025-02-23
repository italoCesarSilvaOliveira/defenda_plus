import { View, Text, StyleSheet} from "react-native";
import { Header } from "../../components/Header";
import { SemInfo } from "../../screens/SemInfo";
export default function ViewPage() {
  return (
    <View style={styles.container}>
      <Header />
      <SemInfo />
      
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