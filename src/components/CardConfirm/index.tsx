import React from "react";
import { Modal } from "react-native";
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
}

export const CardConfirm: React.FC<ConfirmationDialogProps> = ({
  visible,
  onConfirm,
  onClose,
  nomeDia,
  dia,
  mes,
  time,
}) => {
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
          <ConfirmButton onPress={onConfirm}>
            <ButtonConfirm>Confirmar?</ButtonConfirm>
          </ConfirmButton>
        </Container>
      </Overlay>
    </Modal>
  );
};
