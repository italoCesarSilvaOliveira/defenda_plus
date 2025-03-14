import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './styles';
import theme from '../../global/styles/theme';
import axios from 'axios';

interface Card {
  id: string;
  dia: string;
  mes: string;
  status: 'ocupado' | 'marcado' | 'disponivel' | 'bloqueado';
}

interface Day {
  day: string; 
}

export function CalendarComponent() {
  const [cards, setCards] = useState<Card[]>([]);

  // Função para obter os dados da API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Defina a URL e o token diretamente
        const CALENDLY_EVENT_TYPES_URL = 'https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/3118a603-1be7-40c2-800a-8f84ac539324&event_type=https://api.calendly.com/event_types/51c787f4-d90c-4d68-92ed-69ea0120e1d8';
        const CALENDLY_ACCESS_TOKEN = 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQxOTYwNjE0LCJqdGkiOiI5NDMxZGE0ZS03MDIzLTQ4OGItYjgzNC05MTNkYTg2NjVlODQiLCJ1c2VyX3V1aWQiOiIzMTE4YTYwMy0xYmU3LTQwYzItODAwYS04Zjg0YWM1MzkzMjQifQ.KOZF_sjRgX72RYp2oavtpl-uUkEv9LGnoSxo4d1FS9dXBclSYUeSASZNyEwQTVpkLvlDmjOVu-SY-nZKcGsqqw';

        // Fazendo a requisição para a API
        const response = await axios.get(CALENDLY_EVENT_TYPES_URL, {
          headers: {
            Authorization: CALENDLY_ACCESS_TOKEN,
          },
        });

        const eventTypes = response.data?.collection || [];
        const mappedCards = eventTypes.map((event: any) => {
          const startTime = new Date(event.calendar_event.start_time);
          const day = startTime.getDate().toString().padStart(2, '0');
          const month = startTime.getMonth() + 1;
          
          return {
            id: event.calendar_event.external_id,
            dia: day,
            mes: (month).toString().padStart(2, '0'),
            status: 'disponivel',  // Default status
          };
        });
        setCards(mappedCards);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchCards();
  }, []);

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

  // Gerar os dias marcados com base nos cartões
  const markedDates = cards.reduce((acc: { [key: string]: { marked: boolean; dotColor?: string } }, card: Card) => {
    const dateKey = `2025-${card.mes}-${card.dia}`;
    acc[dateKey] = { marked: true, dotColor: getDotColor(card.status) };
    return acc;
  }, {});

  return (
    <View style={[styles.component]}> 
      <View style={[styles.card]}>
        <Calendar
          onDayPress={(day: Day) => {
            console.log('selected day', day);
          }}
          renderHeader={renderHeader}
          markedDates={markedDates}
          theme={{
            textSectionTitleColor: '#000000', 
          }}
          hideExtraDays={true} 
        />
      </View>
    </View>
  );
}
