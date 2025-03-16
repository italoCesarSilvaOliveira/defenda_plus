import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Logo, Title, Subtitle, ContainerText, Button, ButtonText, GoogleIcon, AppleIcon } from "./styles";
import { TOKEN, API_BASE } from '@env';


export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [userUrl, setUserUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserUrl = await AsyncStorage.getItem("calendly_user_url");

        if (storedUserUrl) {
          setUserUrl(storedUserUrl);
          return;
        }

        const response = await fetch(`${API_BASE}/users/me`, {
          headers: {
            Authorization: `${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }

        const data = await response.json();
        const userUri = data.resource.uri;
        await AsyncStorage.setItem("calendly_user_url", userUri);
        setUserUrl(userUri);
      } catch (error) {
        console.error("Erro ao buscar usuário do Calendly:", error);
        Alert.alert("Erro", "Não foi possível carregar seus dados do Calendly.");
      }
    };

    fetchUserId();
  }, []);

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
