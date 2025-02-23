import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";


export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${theme.colors.white};
`;

export const Card = styled.View`
  height: ${RFValue(200)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primary};
  border-bottom-left-radius: ${RFValue(20)}px; 
  border-bottom-right-radius: ${RFValue(20)}px;
`;

export const ProfileImage = styled.Image`
  width: ${RFValue(169)}px;
  height: ${RFValue(169)}px;
  border-radius: ${RFValue(85)}px;
  margin-top: ${RFValue(80)}px;
  position: absolute;
`;

export const UserName = styled.Text`
  margin-top: ${RFValue(60)}px;;
  font-family: ${theme.fonts.p_semiBold};
  font-size: ${RFValue(30)}px;
  color: ${theme.colors.black};
  margin-bottom: ${RFValue(5)}px;
`;

export const UserProf = styled.Text`
  font-family: ${theme.fonts.p_regular};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.black};
  margin-bottom: ${RFValue(20)}px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: ${RFValue(290)}px;
  height: ${RFValue(70)}px;
  margin-top: ${RFValue(30)}px;
  background-color: ${theme.colors.red};
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.p_semiBold};
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.white};
`;