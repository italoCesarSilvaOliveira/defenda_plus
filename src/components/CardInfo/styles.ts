import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  status: "disponivel" | "marcado" | "ocupado" | "bloqueado"; 
}

export const CardContainer = styled.View`
  padding: ${RFValue(8)}px;
  margin-left: ${RFValue(25)}px;
`;

export const Card = styled.View<TypeProps>`
  margin-top: ${RFValue(5)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${RFValue(295)}px;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(15)}px;

  ${(props: TypeProps) => props.status === 'disponivel' && css`
    background-color: ${theme.colors.secondary};
  `}
  ${(props: TypeProps) => props.status === 'bloqueado' && css`
    background-color: ${theme.colors.secondary};
  `}
  ${(props: TypeProps) => props.status === 'ocupado' && css`
    background-color: ${theme.colors.negative};
  `}
  ${(props: TypeProps) => props.status === 'marcado' && css`
    background-color: ${theme.colors.positive};
  `}
`;
export const InfoContainer = styled.View`
`;

export const Prof = styled.Text`
  font-family: ${theme.fonts.p_bold};
  font-size: ${RFValue(18)}px;
  color: ${theme.colors.black};
`;

export const Time = styled.Text`
  font-family: ${theme.fonts.p_regular};
  font-size: ${RFValue(16)}px;
  color: ${theme.colors.black};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(35)}px;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
