import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { HORARIO_URl, TOKEN } from '@env';
import { 
  Container, 
  InfoSection, 
  CardButton, 
  ButtonText, 
  Title,
  Card,
  Emoji,
  InfoText,
  DataText,
  Local,
  EmojiLocal,
  CardInfo,
  Prof,
  Time,
} from './styles';

export const TelaView = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [userUrl, setUserUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserUrl = async () => {
      try {
        const storedUserUrl = await AsyncStorage.getItem("calendly_user_url");
        if (!storedUserUrl) {
          Alert.alert("Erro", "URL do usuário não encontrada. Faça login novamente.");
          return;
        }
        setUserUrl(storedUserUrl);
      } catch (error) {
        console.error("Erro ao recuperar URL do usuário:", error);
      }
    };

    fetchUserUrl();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!userUrl) return;

      try {
        const response = await axios.get(`${HORARIO_URl}?user=${userUrl}`, {
          headers: {
            Authorization: TOKEN, 
          },
        });

        const event = response.data?.collection?.[1];

        if (event) {
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
          const userName = event.event_memberships?.[0]?.user_name?.split(' ').slice(0, 2).join(' ') || "Professor";

          let location = '';
          if (event.location?.type === 'google_conference') {
            location = 'Google Meet';
          } else if (event.location?.location) {
            location = event.location.location;
          } else {
            location = 'Local não disponível';
          }

          setEventData({
            date: startTime.toLocaleDateString('pt-BR'),
            location,
            prof: userName,
            time: `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          });
        } else {
          Alert.alert("Aviso", "Nenhum evento encontrado para o usuário.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert("Erro", "Erro ao buscar dados. Veja o console para detalhes.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [userUrl]);

  if (loading) {
    return (
      <Container>
        <Title>Carregando...</Title>
      </Container>
    );
  }

  if (!eventData) {
    return (
      <Container>
        <Title>Nenhum agendamento disponível.</Title>
      </Container>
    );
  }

  return (
    <Container>
      <InfoSection>
        <Title>Informações</Title>
        <Card>
          <Emoji source={require("../../../assets/oculos-escuros.png")} />
          <DataText>{eventData.date}</DataText>
          <Local>
            <EmojiLocal source={require("../../../assets/map-pin.png")} />
            <InfoText>{eventData.location}</InfoText>
          </Local>
        </Card>
        <CardInfo>
          <Prof>{eventData.prof}</Prof>
          <Time>Horário: {eventData.time}</Time>
        </CardInfo>
        <CardButton onPress={() => Alert.alert("Cancelar", "Função ainda não implementada.")}>
          <MaterialIcons name="block-flipped" size={32} color="white" />
          <ButtonText>Cancelar Agendamento</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};
