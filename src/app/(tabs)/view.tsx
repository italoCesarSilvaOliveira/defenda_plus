import { View, Text, StyleSheet} from "react-native";
import { HeaderComponent } from "../components/index";
import { TelaView } from "../../screens/TelaView";
export default function ViewPage() {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <TelaView />
      
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