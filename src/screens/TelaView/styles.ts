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

export const Card = styled.View`
  margin-top: ${RFValue(10)}px;
  width: ${RFValue(290)}px;
  height: ${RFValue(270)}px;
  background-color: ${theme.colors.primary};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
`;

export const Emoji = styled.Image`
  width: ${RFValue(81)}px;
  height: ${RFValue(81)}px;
  margin-right: ${RFValue(10)}px;
`;

export const DataText = styled.Text`
  font-family: ${theme.fonts.r_bold};
  font-size: ${RFValue(30)}px;
  color: ${theme.colors.white};
  `;

export const Local = styled.View`
  
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const EmojiLocal = styled.Image`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  margin-right: ${RFValue(10)}px;
`;

export const InfoText = styled.Text`
  font-family: ${theme.fonts.r_regular};
  font-size: ${RFValue(25)}px;
  color: ${theme.colors.white};
`;

export const CardInfo = styled.View`
  margin-top: ${RFValue(20)}px;
  width: ${RFValue(290)}px;
  height: ${RFValue(60)}px;
`;

export const Prof = styled.Text`
  font-family: ${theme.fonts.p_semiBold};
  font-size: ${RFValue(30)}px;
  color: ${theme.colors.black};
`;

export const Time = styled.Text`
  font-family: ${theme.fonts.p_medium};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.black};
`;

export const CardButton = styled.TouchableOpacity`
  width: ${RFValue(290)}px;
  height: ${RFValue(60)}px;
  background-color: ${theme.colors.bottonCancelamento};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(25)}px;
  gap: ${RFValue(10)}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.r_medium};
  font-size: ${RFValue(17)}px;
  color: ${theme.colors.white};
`;

