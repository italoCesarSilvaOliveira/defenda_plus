import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";


export const CardContainer = styled.View`
  padding: ${RFValue(8)}px;
  margin-top: ${RFValue(30)}px;
  margin-left: ${RFValue(25)}px;
`;

export const Header = styled.Text`
  font-family: ${theme.fonts.r_bold};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.gray};
`;

export const Card = styled.View`
  margin-top: ${RFValue(15)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${RFValue(295)}px;
  padding: ${RFValue(8)}px;
  border-color: ${theme.colors.gray};
  border-width: ${RFValue(1)}px;
  border-style: dashed;
  border-radius: ${RFValue(15)}px;
`;

export const InfoContainer = styled.View`
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.p_bold};
  font-size: ${RFValue(18)}px;
  color: ${theme.colors.gray};
`;

export const Time = styled.Text`
  font-family: ${theme.fonts.p_regular};
  font-size: ${RFValue(16)}px;
  color: ${theme.colors.gray};
`;
