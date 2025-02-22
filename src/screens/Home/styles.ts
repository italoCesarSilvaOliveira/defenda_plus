import styled from "styled-components/native";
import theme from "../../global/styles/theme"; 
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`  
  flex: 1;
  background-color: ${theme.colors.white};
`;

export const Topo = styled.View`  
  flex: 1;
  margin-top: ${RFValue(30)}px;
`;
