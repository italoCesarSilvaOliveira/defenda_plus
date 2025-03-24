import React from "react";
import { useRouter } from "expo-router";  
import { Card } from "../../components/CardViewSemInfo";
import { 
    Container, 
    InfoSection, 
    CardButton, 
    ButtonText, 
    Title,
} from '../../screens/SemInfoView/styles';



export const SemInfo = () => {
  const router = useRouter();

  const handleAgendarPress = () => {
    router.push("/");
  };

  return (
    <Container>
      <InfoSection>
        <Title>Informações</Title>
        <Card />
        <CardButton onPress={handleAgendarPress}>
          <ButtonText>Agendar Horário?</ButtonText>
        </CardButton>
      </InfoSection>
    </Container>
  );
};