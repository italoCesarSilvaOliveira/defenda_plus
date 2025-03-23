import React from "react";
import { Modal, Linking } from "react-native";
import { 
  Overlay,
  Container, 
  CloseButton, 
  ConfirmButton, 
  ButtonText,
  Description,
  ButtonConfirm,
  ContDescription,
} from './styles';

interface ConfirmationDialogProps {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  nomeDia: string;
  dia: string;
  mes: string;
  time: string;
  schedulingUrl?: string; 
}

export const CardConfirm: React.FC<ConfirmationDialogProps> = ({
  visible,
  onConfirm,
  onClose,
  nomeDia,
  dia,
  mes,
  time,
  schedulingUrl, 
}) => {
  
  const handleConfirm = () => {
    if (schedulingUrl) {
      Linking.openURL(schedulingUrl);
    } else {
      onConfirm();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Overlay>
        <Container>
          <CloseButton onPress={onClose}>
            <ButtonText>x</ButtonText>
          </CloseButton>
          <ContDescription>
            <Description>{nomeDia}</Description>
            <Description>{dia} {mes}</Description>
            <Description>{time}</Description>
          </ContDescription>
          <ConfirmButton onPress={handleConfirm}>
            <ButtonConfirm>Agendar?</ButtonConfirm>
          </ConfirmButton>
        </Container>
      </Overlay>
    </Modal>
  );
};
