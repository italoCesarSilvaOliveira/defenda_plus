import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { HORARIO_URl, TOKEN, EVENTO, USER } from '@env';
import { getControle, setControle } from "../../controle";
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
} from '../../screens/TelaView/styles';
import { router } from "expo-router";

interface EventCard {
  id: string;
  nomeDia: string;
  dia: string;
  mes: string;
  year: string;
  time: string;
  prof: string;
  status: "marcado" | "disponivel" | "bloqueado" | "ocupado";
  scheduling_url?: string;
}

export const TelaView = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [userUrl, setUserUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [controle, setControleState] = useState<boolean>(getControle());

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

  // Recarrega dados sempre que controle muda
  useEffect(() => {
    const fetchEventData = async () => {
      if (!userUrl) return;

      setLoading(true);
      try {
        const response = await axios.get(HORARIO_URl, {
          headers: { Authorization: `${TOKEN}` },
          params: {
            user: userUrl,
            status: 'active',
          },
        });

        const activeEvents = response.data?.collection || [];
        const filteredEvents = activeEvents
          .filter((event: any) => event.name.includes(EVENTO))
          .filter((event: any) => {
            const startTime = new Date(event.start_time);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            return startTime >= hoje;
          });

        let eventoMarcado: any = null;
        let posicaoEventoMarcado: number | null = null;

        for (let i = 0; i < filteredEvents.length; i++) {
          const event = filteredEvents[i];
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
          let status: EventCard["status"] = "ocupado";

          try {
            const inviteesUrl = `${event.uri}/invitees`;
            const inviteesResponse = await axios.get(inviteesUrl, {
              headers: { Authorization: `${TOKEN}` },
            });

            const invitees = inviteesResponse.data?.collection || [];
            const foundInvitee = invitees.find((invitee: any) =>
              invitee?.name?.toUpperCase()?.trim() === USER?.toUpperCase()?.trim()
            );

            if (foundInvitee) {
              status = "marcado";
              eventoMarcado = event;
              posicaoEventoMarcado = i;
              console.log('Evento marcado encontrado na posição:', i);
              break;
            }

          } catch (err) {
            console.warn(`Erro ao buscar convidados do evento ${event.uri}:`, err);
          }
        }

        if (eventoMarcado) {
          const startTime = new Date(eventoMarcado.start_time);
          const endTime = new Date(eventoMarcado.end_time);
          const userName = eventoMarcado.event_memberships?.[0]?.user_name?.split(' ').slice(0, 2).join(' ') || "Professor";
          const uri = eventoMarcado.uri;

          let location = '';
          if (eventoMarcado.location?.type === 'google_conference') {
            location = 'Google Meet';
          } else if (eventoMarcado.location?.location) {
            location = eventoMarcado.location.location;
          } else {
            location = 'Local não disponível';
          }

          setEventData({
            date: startTime.toLocaleDateString('pt-BR'),
            location,
            prof: userName,
            time: `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            posicao: posicaoEventoMarcado,
            eventUri: uri
          });
        } else {
          setEventData(null);
        }

      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        Alert.alert("Erro", "Erro ao buscar eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [userUrl, controle]);

  const handleCancelAppointment = async () => {
    if (!eventData?.eventUri) {
      Alert.alert("Erro", "URI do evento não encontrada.");
      return;
    }

    try {
      await axios.post(
        `${eventData.eventUri}/cancellation`,
        { reason: "Cancelado pelo usuário." },
        {
          headers: {
            Authorization: `${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Sucesso", "Agendamento cancelado com sucesso.");

      const novoControle = !controle;
      setControle(novoControle);         
      setControleState(novoControle);    
      router.push("/");

    } catch (error) {
      console.error("Erro ao cancelar:", error);
      Alert.alert("Erro", "Falha ao cancelar o agendamento.");
    }
  };

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
        <CardButton onPress={handleCancelAppointment}>
          <MaterialIcons name="block-flipped" size={32} color="white" />
          <ButtonText>Cancelar Agendamento</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};
