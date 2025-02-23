import React from "react";
import { Container, Logo, Title, Subtitle, ContainerText, Button, ButtonText, GoogleIcon, AppleIcon } from "./styles";

export const Login = () => {
  return (
    <Container>
      <Logo source={require("../../../assets/favicon.png")} />
      <ContainerText>
        <Title>Seja bem-vindo!</Title>
        <Subtitle>Crie a sua conta e comece a agendar o seu horário.</Subtitle>
      </ContainerText>
      
      <Button>
        <GoogleIcon source={require("../../../assets/google.png")} />
        <ButtonText>Sign in with Google</ButtonText>
      </Button>

      <Button>
        <AppleIcon source={require("../../../assets/apple.png")} />
        <ButtonText>Sign in with Apple</ButtonText>
      </Button>
    </Container>
  );
};
