import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CardContainer,
  Header,
  Card,
  InfoContainer,
  Title,
  Time,
} from "./styles";


//card para aparecer na Home sem informação
export const CardSemInfo = () => {
  return (
    <CardContainer>
      <Header>Dia | Data</Header>
      <Card>
        <InfoContainer>
          <Title>SEM INFORMAÇÃO</Title>
          <Time>  -  :  - AM / PM</Time>
        </InfoContainer>
        <MaterialCommunityIcons name="hexagon-outline" size={40} color="gray" />
      </Card>
    </CardContainer>
  );
};


