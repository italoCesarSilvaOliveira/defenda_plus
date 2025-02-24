import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFValue(20)}px;
  background-color: ${theme.colors.white};
  align-items: center;
`;


export const InfoSection = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: ${RFValue(10)}px;;
  font-family: ${theme.fonts.p_semiBold};
  font-size: ${RFValue(30)}px;
  color: ${theme.colors.black};
`;


export const CardButton = styled.TouchableOpacity`
  width: ${RFValue(250)}px;
  height: ${RFValue(60)}px;
  background-color: ${theme.colors.positive};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(45)}px;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.p_semiBold};
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.white};
`;
