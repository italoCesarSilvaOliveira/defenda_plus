import { View, Text, StyleSheet} from "react-native";
import { Header } from "../../components/Header";

export default function HomePage() {
  return (
    <View style={{flex: 1, paddingTop: 32}}>
      <Header />
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