  import styled from "styled-components/native";
  import theme from "../../global/styles/theme";
  import { RFValue } from "react-native-responsive-fontsize";


  export const Overlay = styled.View`
    flex: 1;
    background-color:${theme.colors.backgroundModal};
    justify-content: center;
    align-items: center;
  `;

  export const Container = styled.View`
    width: ${RFValue(250)}px;
    height: ${RFValue(250)}px;
    background-color: ${theme.colors.white};
    border-radius: ${RFValue(10)}px; 
    align-items: center;
  `;

  export const CloseButton = styled.TouchableOpacity`
    position: absolute; 
    top: ${RFValue(10)}px; 
    right: ${RFValue(10)}px; 
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(5)}px;
    align-items: center;
`;

  export const ButtonText = styled.Text`
    color: ${theme.colors.black};
    font-family: ${theme.fonts.p_light};
    font-size: ${RFValue(25)}px; 
  `;

export const ContDescription = styled.View`
  margin-top: ${RFValue(10)}px; 
  padding: ${RFValue(20)}px; 
`;

export const Description = styled.Text`
  font-family: ${theme.fonts.p_regular};
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.black};
  text-align: center;
`;

  export const ConfirmButton = styled.TouchableOpacity`
    background-color: green;
    width: ${RFValue(200)}px;
    height: ${RFValue(70)}px; 
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(15)}px;
    justify-content: center; 
    align-items: center; 
  `;

  export const ButtonConfirm = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.p_bold};
    font-size: ${RFValue(22)}px;
  `;