import { View, StyleSheet} from "react-native";
import { Header } from "../../components/Header";
import { Home } from "../../screens/Home";

export default function HomePage() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});