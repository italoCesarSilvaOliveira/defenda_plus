import React from "react";
import { Card } from "../../components/CardViewSemInfo";
import { 
    Container, 
    InfoSection, 
    CardButton, 
    ButtonText, 
    Title,
} from './styles'

export const SemInfo = () => {
  return (
    <Container>
      <InfoSection>
        <Title>Informações</Title>
        <Card/>
        <CardButton>
            <ButtonText>Agendar Horário?</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};
