import React from "react";
import { TouchableOpacity } from "react-native"; // Remover o import do Linking, já que não será mais usado
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

  const handlePress = () => {
    onPress(); // Apenas chama o onPress, sem abrir qualquer URL
  };

  return (
    <TouchableOpacity 
      onPress={isDisabled ? undefined : handlePress} 
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
