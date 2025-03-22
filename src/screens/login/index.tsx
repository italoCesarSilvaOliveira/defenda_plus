import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Logo, Title, Subtitle, ContainerText, Button, ButtonText, GoogleIcon, AppleIcon } from "./styles";
import { TOKEN, API_BASE } from '@env';


export const Login = ({ onLogin }: { onLogin: () => void }) => {
    const handleLogin = () => {
    onLogin();
  };

  return (
    <Container>
      <Logo source={require("../../../assets/favicon.png")} />
      <ContainerText>
        <Title>Seja bem-vindo!</Title>
        <Subtitle>Crie a sua conta e comece a agendar o seu horário.</Subtitle>
      </ContainerText>
      <Button onPress={handleLogin}>
        <GoogleIcon source={require("../../../assets/google.png")} />
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
      <Button onPress={handleLogin}>
        <AppleIcon source={require("../../../assets/apple.png")} />
        <ButtonText>Sign in with Apple</ButtonText>
      </Button>
    </Container>
  );
};
