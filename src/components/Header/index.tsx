import { View, Image, Text, TouchableOpacity} from "react-native";
import { s } from  "./styles"

export function Header() {
  return <View style={s.container}>
    <Image style={s.image} source={{uri: "https://github.com/italoCesarSilvaOliveira.png "}}/>
    <View style={s.user}>
      <Text style={s.name}>Ítalo César</Text>
    </View>
  </View>
}