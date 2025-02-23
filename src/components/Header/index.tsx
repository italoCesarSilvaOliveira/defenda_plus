import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { 
  Container,
  User, 
  Name, 
  ProfileImage, 
  NotificationButton
} from "./styles";

export function Header() {
  return (
    <Container>
      <User>
        <ProfileImage source={{ uri: "https://github.com/italoCesarSilvaOliveira.png" }} />
        <Name>Ítalo César</Name>
      </User>
      <NotificationButton>
        <Ionicons name="notifications" size={30} color="blue" />
      </NotificationButton>
    </Container>
  );
}
