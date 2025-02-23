import React, { useState } from 'react';
import { Container } from './styles';
import { CalendarComponent } from '../../components/CalendarComponent';
import { CardInfo } from '../../components/CardInfo';
import { CardConfirm } from '../../components/CardConfirm';
import { CardDay } from '../../components/CardDay'; 
import { ScrollView } from 'react-native';
import { cardData } from '../../components/cardData';

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

export function Home() {
  const [cards, setCards] = useState(cardData);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const toggleStatus = (id: number) => {
    const selectedCard = cards.find(card => card.id === id);
    if (selectedCard && selectedCard.status === 'disponivel') {
      setSelectedCardId(id);
      setShowDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedCardId !== null) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.id === selectedCardId) {
            return { ...card, status: "marcado" };
          } else if (card.status === "disponivel") {
            return { ...card, status: "bloqueado" };
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

  const selectedCard = selectedCardId !== null ? cards.find(card => card.id === selectedCardId) : null;

  // Ordenar os cartões
  const sortedCards = [...cards].sort((a, b) => {
    const dateA = new Date(2025, NumberMes(a.mes), parseInt(a.dia), parseInt(a.time.split(':')[0]) + (a.time.includes('PM') ? 12 : 0), 0); 
    const dateB = new Date(2025, NumberMes(b.mes), parseInt(b.dia), parseInt(b.time.split(':')[0]) + (b.time.includes('PM') ? 12 : 0), 0); 

    return dateA.getTime() - dateB.getTime();
  });

  const groupedCards = sortedCards.reduce((acc, card) => {
    const key = `${card.dia}-${card.mes}`;
    if (!acc[key]) {
      acc[key] = { ...card, cards: [] }; 
    }
    acc[key].cards.push(card);
    return acc;
  }, {} as Record<string, { nomeDia: string; dia: string; mes: string; cards: typeof cardData }>);

  return (
    <Container>
      <CalendarComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {Object.values(groupedCards).map(group => (
          <React.Fragment key={`${group.dia}-${group.mes}`}>
            <CardDay
              nomeDia={group.nomeDia}
              dia={group.dia}
              mes={group.mes}
            />
            {group.cards.map(card => (
              <CardInfo
                key={card.id}
                nomeDia={card.nomeDia}
                dia={card.dia}
                mes={card.mes}
                prof={card.prof}
                time={card.time}
                status={card.status}
                onPress={() => toggleStatus(card.id)}
              />
            ))}
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
