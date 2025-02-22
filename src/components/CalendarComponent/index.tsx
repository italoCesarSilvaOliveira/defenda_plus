import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Calendar } from 'react-native-calendars';
import { cardData, Card } from '../cardData'; 
import theme from '../../global/styles/theme';

interface Day {
  day: string; 
}

export function CalendarComponent() {
  const renderHeader = (date: string) => {
    const currentDate = new Date(date);
    const month = currentDate.toLocaleString('pt-BR', { month: 'long' });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          {capitalizedMonth}
        </Text>
      </View>
    );
  };

  const getDotColor = (status: Card['status']) => {
    switch (status) {
      case 'ocupado':
        return theme.colors.negative;
      case 'marcado':
        return theme.colors.positive;
      case 'disponivel':
        return theme.colors.selected;
      case 'bloqueado':
        return theme.colors.negative;
      default:
        return 'black';
    }
  };

  const markedDates = cardData.reduce((acc: { [key: string]: { marked: boolean; dotColor?: string } }, card: Card) => {
    const dateKey = `2025-${card.mes === 'Fevereiro' ? '02' : '03'}-${card.dia.padStart(2, '0')}`;
    acc[dateKey] = { marked: true, dotColor: getDotColor(card.status) };
    return acc;
  }, {});

  return (
    <View style={[styles.component]}> 
      <View style={[styles.card, styles.elevation]}>
        <Calendar
          onDayPress={(day: Day) => {
            console.log('selected day', day);
          }}
          renderHeader={renderHeader}
          markedDates={markedDates} 
          theme={{
            textSectionTitleColor: '#000000', 
          }}
          hideExtraDays={true} // desabilita os dias dos outros meses
        />
      </View>
    </View>
  );
}
