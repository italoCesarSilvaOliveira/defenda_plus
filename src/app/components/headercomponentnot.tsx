import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { 
  Container,
  User, 
  Name, 
  ProfileImage, 
} from "./styles";
import { TouchableOpacity } from "react-native";

export function HeaderComponentNot() {
  const router = useRouter(); 

  return (
    <Container>
      <User>
        <ProfileImage source={{ uri: "https://github.com/italoCesarSilvaOliveira.png" }} />
      </User>
      <Name>Notificações</Name>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={32} color="blue" />
      </TouchableOpacity>
    </Container>
  );
}
