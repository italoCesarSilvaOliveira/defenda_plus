import React, { useState, useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Container } from "./styles";
import { CalendarComponent } from "../../components/CalendarComponent";
import { CardInfo } from "../../components/CardInfo";
import { CardConfirm } from "../../components/CardConfirm";
import { CardDay } from "../../components/CardDay";
import { TOKEN, HORARIO_URl, EVENTO } from "@env";

interface EventCard {
  id: string;
  nomeDia: string;
  dia: string;
  mes: string;
  year: string;
  time: string;
  prof: string;
  status: "marcado" | "disponivel" | "bloqueado" | "ocupado";
}

interface GroupedCards {
  [key: string]: {
    nomeDia: string;
    dia: string;
    mes: string;
    year: string;
    cards: EventCard[];
  };
}

const NumberMes = (month: string): number => {
  const months: Record<string, number> = {
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
  return months[month] ?? 0;
};

const parseTime = (time: string): [number, number] => {
  const [hour, minute] = time.split(":").map(Number);
  const isPM = time.includes("PM");
  const hours24 = isPM ? (hour % 12) + 12 : hour % 12;
  return [hours24, minute];
};

export function Home() {
  const [availableCards, setAvailableCards] = useState<EventCard[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [userUrl, setUserUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAvailableTimes = async () => {
      const EVENT_TYPE_URL = "https://api.calendly.com/event_type_available_times";
      const results: any[] = [];
    
      let currentStartDate = new Date();
      
      if (currentStartDate.getSeconds() < 30) {
        currentStartDate.setSeconds(30); 
      } else {
        currentStartDate.setMinutes(currentStartDate.getMinutes() + 1); 
        currentStartDate.setSeconds(0); 
      }
    
      let currentEndDate = new Date(currentStartDate);
      currentEndDate.setDate(currentEndDate.getDate() + 7); 
    
      try {
        while (true) {
          console.log(`Consultando eventos entre ${currentStartDate.toISOString()} e ${currentEndDate.toISOString()}`);
    
          const response = await axios.get(EVENT_TYPE_URL, {
            headers: { Authorization: `${TOKEN}` },
            params: {
              start_time: currentStartDate.toISOString(),
              end_time: currentEndDate.toISOString(),
              event_type: "https://api.calendly.com/event_types/5c9744fb-1884-408a-a570-d14482bf720c",
            },
          });
    
          const data = response.data?.collection || [];
    
          if (data.length === 0) {
            console.log("Nenhum horário disponível encontrado para este intervalo. Encerrando a pesquisa.");
            break; 
          }
    
          console.log(`Horários disponíveis entre ${currentStartDate.toISOString()} e ${currentEndDate.toISOString()}:`, data);
        
          results.push(...data);
    
          currentStartDate = new Date(currentEndDate);
          currentEndDate = new Date(currentStartDate);
          currentEndDate.setDate(currentEndDate.getDate() + 7); 
        }
    
        console.log("Todos os horários disponíveis encontrados:", results);
    
        const mappedCards: EventCard[] = results.map((event: any, index: number) => {
          const startTime = new Date(event.start_time);
          
          const endTime = new Date(startTime);
          endTime.setMinutes(startTime.getMinutes() + 30); 
        
          return {
            id: `event-${index}`, 
            nomeDia: startTime.toLocaleString("pt-BR", { weekday: "long" }) || "Evento",
            dia: startTime.getDate().toString().padStart(2, "0"),
            mes: (startTime.getMonth() + 1).toString().padStart(2, "0"),
            year: startTime.getFullYear().toString(),
            time: `${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            prof: "Ednei Soares",
            status: "disponivel", 
          };
        });

        setAvailableCards((prevCards) => {
          const newCards = mappedCards.filter((newCard) => !prevCards.some((existingCard) => existingCard.id === newCard.id));
          return [...prevCards, ...newCards];
        });
      } catch (error: any) {
        console.error("Erro ao buscar horários disponíveis:", error.response ? error.response.data : error.message);
        Alert.alert("Erro", "Não foi possível carregar os horários disponíveis.");
      }
    };
    
    fetchAllAvailableTimes();
  }, []);

  useEffect(() => {
    const fetchUserUrl = async () => {
      try {
        const storedUserUrl = await AsyncStorage.getItem("calendly_user_url");
        if (!storedUserUrl) {
          Alert.alert("Erro", "URL do usuário não encontrada. Faça login novamente.");
          return;
        }
        setUserUrl(storedUserUrl);
      } catch (error) {
        console.error("Erro ao recuperar URL do usuário:", error);
      }
    };

    fetchUserUrl();
  }, []);

  useEffect(() => {
    const fetchCalendlyData = async () => {
      if (!userUrl) return;
  
      try {
        const EVENT_URL = `${HORARIO_URl}?user=${userUrl}`;
  
        const response = await axios.get(EVENT_URL, {
          headers: { Authorization: `${TOKEN}` },
        });
  
        const eventTypes = response.data?.collection;
        if (!eventTypes) throw new Error("Nenhum evento encontrado.");
  
        const activeEvents = eventTypes.filter((event: any) => event.status === "active");
  
        const filteredEvents = activeEvents.filter((event: any) => event.name.includes(EVENTO));
  
        const mappedCards: EventCard[] = filteredEvents.map((event: any) => {
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
  
          let status: EventCard["status"] = "ocupado"; 
  
          return {
            id: event.calendar_event?.external_id || event.uri,
            nomeDia: startTime.toLocaleString("pt-BR", { weekday: "long" }) || "Evento",
            dia: startTime.getDate().toString().padStart(2, "0"),
            mes: (startTime.getMonth() + 1).toString().padStart(2, "0"),
            year: startTime.getFullYear().toString(),
            time: `${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            prof: event.event_memberships?.[0]?.user_name?.split(" ").slice(0, 2).join(" ") || "Professor",
            status, 
          };
        });

        setAvailableCards((prevCards) => {
          const newCards = mappedCards.filter((newCard) => !prevCards.some((existingCard) => existingCard.id === newCard.id));
          return [...prevCards, ...newCards];
        });
      } catch (error: any) {
        console.error("Erro ao buscar dados do Calendly:", error.response ? error.response.data : error.message);
        Alert.alert("Erro", "Não foi possível carregar os eventos.");
      }
    };
  
    fetchCalendlyData();
  }, [userUrl]);

  const toggleStatus = (id: string) => {
    const selectedCard = availableCards.find((card) => card.id === id);
    if (selectedCard && selectedCard.status === "disponivel") {
      setSelectedCardId(id);
      setShowDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedCardId !== null) {
      setAvailableCards((prevCards) =>
        prevCards.map((card) =>
          card.id === selectedCardId
            ? { ...card, status: "marcado" }
            : card.status === "disponivel"
            ? { ...card, status: "bloqueado" }
            : card
        )
      );
    }
    setShowDialog(false);
    setSelectedCardId(null);
  };

  const handleClose = () => {
    setShowDialog(false);
    setSelectedCardId(null);
  };

  const sortedCards = [...availableCards].sort((a, b) => {
    const dateA = new Date(`${a.year}-${a.mes}-${a.dia}T${a.time.split(" - ")[0]}:00`);
    const dateB = new Date(`${b.year}-${b.mes}-${b.dia}T${b.time.split(" - ")[0]}:00`);
    return dateA.getTime() - dateB.getTime();
  });

  const groupedCards: GroupedCards = sortedCards.reduce((acc, card) => {
    const key = `${card.dia}-${card.mes}-${card.year}`; 
    if (!acc[key]) acc[key] = { nomeDia: card.nomeDia, dia: card.dia, mes: card.mes, year: card.year, cards: [] };
    acc[key].cards.push(card);
    return acc;
  }, {} as GroupedCards);

  const selectedCard = availableCards.find((card) => card.id === selectedCardId);

  return (
    <Container>
      <CalendarComponent />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {Object.values(groupedCards).map((group) => (
          <React.Fragment key={`${group.dia}-${group.mes}-${group.year}`}>
            <CardDay key={`${group.dia}-${group.mes}-${group.year}`} nomeDia={group.nomeDia} dia={group.dia} mes={group.mes} />
            {group.cards.map((card) => (
              <CardInfo
                key={card.id} 
                {...card}
                onPress={() => toggleStatus(card.id)}
                isDisabled={card.status === "ocupado"} 
              />
            ))}
          </React.Fragment>
        ))}

        <CardConfirm
          visible={showDialog}
          onConfirm={handleConfirm}
          onClose={handleClose}
          nomeDia={selectedCard?.nomeDia || ""}
          dia={selectedCard?.dia || ""}
          mes={selectedCard?.mes || ""}
          time={selectedCard?.time || ""}
        />
      </ScrollView>
    </Container>
  );
}
