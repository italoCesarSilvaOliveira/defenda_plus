import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";



export const Header = styled.Text`
  font-family: ${theme.fonts.r_bold};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.gray};
  margin-top: ${RFValue(15)}px;
  margin-left: ${RFValue(25)}px;;
`;

export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${RFValue(295)}px;
  padding: ${RFValue(8)}px;
`;
