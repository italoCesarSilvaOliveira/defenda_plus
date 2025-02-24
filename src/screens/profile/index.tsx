import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { 
    Container,
    Card, 
    ProfileImage, 
    UserName, 
    UserProf, 
    LogoutButton, 
    ButtonText,
 } from "./styles";


export const UserProfile = () => {
  return (
    <Container>
        <Card/>
        <ProfileImage source={{ uri: 'https://github.com/italoCesarSilvaOliveira.png' }} />
        <UserName>Ítalo César S. O.</UserName>
        <UserProf>Aluno IFNMG</UserProf>
        <LogoutButton>
          <ButtonText>Sair da Conta ?</ButtonText>
        </LogoutButton>
    </Container>
  );
};
