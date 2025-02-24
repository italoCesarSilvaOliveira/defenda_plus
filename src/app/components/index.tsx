import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { 
  Container,
  User, 
  Name, 
  ProfileImage, 
} from "./styles";

import { Link } from "expo-router";

export function HeaderComponent() {
  return (
    <Container>
      <User>
        <ProfileImage source={{ uri: "https://github.com/italoCesarSilvaOliveira.png" }} />
        <Name>Ítalo César</Name>
      </User>
      <Link href={"/notification"}>
        <Ionicons name="notifications" size={30} color="blue"/>
      </Link>
    </Container>
  );
}
