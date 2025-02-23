import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

export const Container = styled.View`
  width: 100%;
  background-color: ${theme.colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(10)}px ${RFValue(20)}px;
`;

export const ProfileImage = styled.Image`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;
  border-radius: ${RFValue(21)}px;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(10)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: ${theme.fonts.r_bold};
  color:${theme.colors.black} ;
`;

export const NotificationButton = styled.TouchableOpacity``;
