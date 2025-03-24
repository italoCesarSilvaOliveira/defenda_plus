import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { 
  Container,
  User, 
  Name, 
  ProfileImage, 
} from "./styles";

export function HeaderComponent() {
  return (
    <Container>
      <User>
        <ProfileImage source={{ uri: "https://github.com/italoCesarSilvaOliveira.png" }} />
        <Name>Ítalo César</Name>
      </User>

      <Pressable 
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]} 
        onPress={() => {}} 
      >
        <Ionicons name="log-in" size={40} />
      </Pressable>
    </Container>
  );
}
