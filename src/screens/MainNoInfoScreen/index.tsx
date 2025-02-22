import React from 'react';
import { Container } from './styles';
import { CalendarComponent } from '../../components/CalendarComponent';
import { CardSemInfo } from '../../components/CardSemInfo';



export function MainNoInfoScreen() {
  return (
    <Container>
      <CalendarComponent/>
      <CardSemInfo/>
    </Container>
  );
}

