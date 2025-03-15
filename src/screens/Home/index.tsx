import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { CalendarComponent } from '../../components/CalendarComponent';
import { CardInfo } from '../../components/CardInfo';
import { CardConfirm } from '../../components/CardConfirm';
import { CardDay } from '../../components/CardDay';
import { ScrollView } from 'react-native'; 
import { CALENDLY_EVENT_TYPES_URL, CALENDLY_ACCESS_TOKEN, EVENT_NAME } from '@env';
import axios from 'axios';

const NumberMes = (month: string) => {
  const months = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11,
  };
  return months[month as keyof typeof months];
};

const parseTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const isPM = time.includes('PM');
  const hours24 = isPM ? (hour % 12) + 12 : hour % 12;
  return [hours24, minute];
};

export function Home() {
  const [availableCards, setAvailableCards] = useState<any[]>([]); 
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | string | null>(null);

  useEffect(() => {
    const fetchCalendlyData = async () => {
      try {
        const response = await axios.get(CALENDLY_EVENT_TYPES_URL, {
          headers: {
            Authorization: CALENDLY_ACCESS_TOKEN, 
          },
        });
    
        const eventTypes = response.data?.collection;
        if (!eventTypes) {
          throw new Error("Nenhum evento encontrado ou erro ao acessar os dados.");
        }
    
        const filteredEvents = eventTypes.filter((event: any) => event.name.includes(process.env.EVENT_NAME ));
  
        const mappedCards = filteredEvents.map((event: any) => {
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
    
          const day = startTime.getDate();
          const month = startTime.getMonth();
          const startTimeFormatted = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const endTimeFormatted = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
          const userName = event.event_memberships[0]?.user_name.split(' ').slice(0, 2).join(' ') || "Professor";
    
          return {
            id: event.calendar_event.external_id,
            nomeDia: startTime.toLocaleString('pt-BR', { weekday: 'long' }) || "Evento",
            dia: day.toString().padStart(2, '0'),
            mes: (month + 1).toString().padStart(2, '0'),
            time: `${startTimeFormatted} - ${endTimeFormatted}`,
            prof: userName,
            status: event.status === 'confirmed' ? 'marcado' : 'disponivel',
          };
        });
    
        setAvailableCards(mappedCards); 
      } catch (error: any) {
        console.error("Erro ao buscar dados do Calendly: ", error.response ? error.response.data : error.message);
        alert("Erro ao buscar dados. Veja o console para detalhes.");
      }
    };

    fetchCalendlyData();
  }, []); 

  const toggleStatus = (id: string) => {
    const selectedCard = availableCards.find(card => card.id === id); 
    if (selectedCard && selectedCard.status === 'disponivel') {
      setSelectedCardId(id);
      setShowDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedCardId !== null) {
      setAvailableCards(prevCards => {
        return prevCards.map(card => {
          if (card.id === selectedCardId) {
            return { ...card, status: 'marcado' }; 
          } else if (card.status === 'disponivel') {
            return { ...card, status: 'bloqueado' }; 
          }
          return card;
        });
      });
    }
    setShowDialog(false);
    setSelectedCardId(null);
  };

  const handleClose = () => {
    setShowDialog(false);
    setSelectedCardId(null);
  };

  const selectedCard = selectedCardId !== null ? availableCards.find(card => card.id === selectedCardId) : null;

  // Ordenar os cartões
  const sortedCards = [...availableCards].sort((a, b) => {
    const [startA, startB] = [a.time, b.time].map(time => parseTime(time.split(' - ')[0]));
    const dateA = new Date(2025, NumberMes(a.mes) - 1, parseInt(a.dia), startA[0], startA[1]);
    const dateB = new Date(2025, NumberMes(b.mes) - 1, parseInt(b.dia), startB[0], startB[1]);
    return dateA.getTime() - dateB.getTime();
  });

  // Agrupar os cartões por dia e mês
  const groupedCards = sortedCards.reduce((acc, card) => {
    const key = `${card.dia}-${card.mes}`;
    if (!acc[key]) {
      acc[key] = { nomeDia: card.nomeDia, dia: card.dia, mes: card.mes, cards: [] };
    }
    acc[key].cards.push(card);
    return acc;
  }, {} as Record<string, { nomeDia: string; dia: string; mes: string; cards: typeof availableCards }>);

  return (
    <Container>
      <CalendarComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {Object.values(groupedCards).map((group: any, groupIndex: number) => (
          <React.Fragment key={`group-${groupIndex}`}>
            <CardDay
              key={`card-day-${group.dia}-${group.mes}`}  
              nomeDia={group.nomeDia}
              dia={group.dia}
              mes={group.mes}
            />
            {group.cards.map((card: any) => {
              return (
                <CardInfo
                  key={`card-${card.id}`}  
                  nomeDia={card.nomeDia}
                  dia={card.dia}
                  mes={card.mes}
                  time={card.time}
                  status={card.status}  
                  prof={card.prof}
                  onPress={() => toggleStatus(card.id)}
                />
              );
            })}
          </React.Fragment>
        ))}

        <CardConfirm
          visible={showDialog}
          onConfirm={handleConfirm}
          onClose={handleClose}
          nomeDia={selectedCard?.nomeDia || ''}
          dia={selectedCard?.dia || ''}
          mes={selectedCard?.mes || ''}
          time={selectedCard?.time || ''}
        />
      </ScrollView>
    </Container>
  );
}
