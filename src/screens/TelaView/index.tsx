import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios'; 
import { CALENDLY_EVENT_TYPES_URL, CALENDLY_ACCESS_TOKEN } from '@env';
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

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(CALENDLY_EVENT_TYPES_URL, {
          headers: {
            Authorization: CALENDLY_ACCESS_TOKEN, 
          },
        });

        const event = response.data?.collection?.[0]; 

        if (event) {
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
          const userName = event.event_memberships[0]?.user_name.split(' ').slice(0, 2).join(' ') || "Professor";

          
          let location = '';
          if (event.location?.type === 'google_conference') {
            location = `Google meet`;  // Para conferências do Google Meet
          } else if (event.location?.location) {
            location = event.location?.location; // Para locais 
          } else {
            location = 'Local não disponível';  // Quando não passado
          }

          setEventData({
            date: startTime.toLocaleDateString('pt-BR'),
            location: location,
            prof: userName,
            time: `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          });
        }
      } catch (error) {
        alert("Erro ao buscar dados. Veja o console para detalhes.");
      }
    };

    fetchEventData();
  }, []);

  if (!eventData) {
    return (
      <Container>
        <Title>Carregando...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <InfoSection>
        <Title>Informações</Title>
        <Card>
          <Emoji source={require("../../../assets/oculos-escuros.png")}/>
          <DataText>{eventData.date}</DataText>
          <Local>
            <EmojiLocal source={require("../../../assets/map-pin.png")}/>
            <InfoText>{eventData.location}</InfoText> 
          </Local>
        </Card>
        <CardInfo>
          <Prof>{eventData.prof}</Prof>
          <Time>Horário: {eventData.time}</Time>
        </CardInfo>
        <CardButton>
          <MaterialIcons name="block-flipped" size={32} color="white" />
          <ButtonText>Cancelar Agendamento</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};
