import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
} from './styles'

export const TelaView = () => {
  return (
    <Container>
      <InfoSection>
        <Title>Informações</Title>
        <Card>
          <Emoji source={require("../../../assets/oculos-escuros.png")}/>
          <DataText>8 de janeiro</DataText>
          <Local>
            <EmojiLocal source={require("../../../assets/map-pin.png")}/>
            <InfoText>Predio 2 sala 7</InfoText>
          </Local>
        </Card>
        <CardInfo>
          <Prof>Professor Leonardo</Prof>
          <Time>Horário: 15:20</Time>
        </CardInfo>
        <CardButton>
            <MaterialIcons name="block-flipped" size={32} color="white" />
            <ButtonText>Cancelar Agendamento</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};
