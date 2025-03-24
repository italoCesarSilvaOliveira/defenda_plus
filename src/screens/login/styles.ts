import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${theme.colors.primary}; 
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: ${RFValue(120)}px;
  height: ${RFValue(120)}px;
`;

export const ContainerText = styled.View`
  margin: ${RFValue(25)}px;
`;

export const Title = styled.Text`
  margin-top: ${RFValue(30)}px;
  font-family: ${theme.fonts.p_bold};
  font-size: ${RFValue(25)}px;
  color: ${theme.colors.white};
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-family: ${theme.fonts.p_light};
  font-size: ${RFValue(15)}px;
  color: ${theme.colors.white};
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  width: ${RFValue(250)}px;
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(14)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.r_bold};
  font-size: ${RFValue(15)}px;
  color: ${theme.colors.black};
  text-align: center;
  flex: 1;
`;

export const GoogleIcon = styled.Image`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  margin-right: ${RFValue(10)}px;
`;

export const AppleIcon = styled.Image`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  margin-right: ${RFValue(10)}px;
`;
