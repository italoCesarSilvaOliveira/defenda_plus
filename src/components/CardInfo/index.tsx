import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  CardContainer,
  Card,
  InfoContainer,
  Prof,
  Time,
  Icon,
} from "./styles";

interface Props {
  nomeDia: string;
  dia: string;
  mes: string;
  prof: string;
  time: string;
  status: "disponivel" | "marcado" | "ocupado" | "bloqueado";
  onPress: () => void;
  isDisabled: boolean; 
}

export const CardInfo = ({
  prof,
  time,
  status,
  onPress,
  isDisabled, 
}: Props) => {

  const icons: Record<Props["status"], keyof typeof Feather.glyphMap> = {
    disponivel: "circle",
    marcado: "check-circle",
    ocupado: "stop-circle",
    bloqueado: "circle",
  };

  return (
    <TouchableOpacity 
      onPress={isDisabled ? undefined : onPress} 
      disabled={isDisabled} 
    > 
      <CardContainer>
        <Card status={status}>
          <InfoContainer>
            <Prof>{prof}</Prof>
            <Time>{time}</Time>
          </InfoContainer>
          <Icon name={icons[status]} />
        </Card>
      </CardContainer>
    </TouchableOpacity>
  );
};
