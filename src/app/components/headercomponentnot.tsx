import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { 
  Container,
  User, 
  Name, 
  ProfileImage, 
} from "./styles";

import { Link } from "expo-router";

export function HeaderComponentNot() {
  return (
    <Container>
      <User>
        <ProfileImage source={{ uri: "https://github.com/italoCesarSilvaOliveira.png" }} />
        <Name>Ítalo César</Name>
      </User>
      <Link href={"/index"}>
        <Ionicons name="notifications" size={30} color="blue"/>
      </Link>
    </Container>
  );
}
