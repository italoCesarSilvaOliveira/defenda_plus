import { View, StyleSheet} from "react-native";
import { HeaderComponent } from "../components/index";
import { Home } from "../../screens/Home";

export default function HomePage() {
  return (
    <View style={{flex: 1}}>
      <HeaderComponent />
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