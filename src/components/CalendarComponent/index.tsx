import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Calendar } from 'react-native-calendars';

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

  return (
    <View style={[styles.component]}> 
      <View style={[styles.card, styles.elevation]}>
        <Calendar
          onDayPress={(day: Day) => {
            console.log('selected day', day);
          }}
          renderHeader={renderHeader} 
          theme={{
            textSectionTitleColor: '#000000', 
          }}
        />
      </View>
    </View>
  );
}
