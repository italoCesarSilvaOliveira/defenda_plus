import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Container } from "./styles";
import { CalendarComponent } from "../../components/CalendarComponent";
import { CardInfo } from "../../components/CardInfo";
import { CardConfirm } from "../../components/CardConfirm";
import { CardDay } from "../../components/CardDay";
import { TOKEN, HORARIO_URl, USER, EVENTO, API_BASE } from "@env";

interface EventCard {
  id: string;
  nomeDia: string;
  dia: string;
  mes: string;
  year: string;
  time: string;
  prof: string;
  status: "marcado" | "disponivel" | "bloqueado" | "ocupado";
  scheduling_url?: string;
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
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);
  const [userUrl, setUserUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [occupiedTimes, setOccupiedTimes] = useState<Set<string>>(new Set());
  let controle = false;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserUrl = await AsyncStorage.getItem("calendly_user_url");

        if (storedUserUrl) {
          setUserUrl(storedUserUrl);
          const storedUserId = storedUserUrl.split("/").pop();
          setUserId(storedUserId || null);
          return;
        }

        const response = await fetch(`${API_BASE}/users/me`, {
          headers: {
            Authorization: `${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }

        const data = await response.json();
        const userUri = data.resource.uri;
        const extractedUserId = userUri.split("/").pop();

        if (extractedUserId) {
          setUserId(extractedUserId);
          await AsyncStorage.setItem("calendly_user_url", userUri);
        }

        setUserUrl(userUri);
      } catch (error) {
        console.error("Erro ao buscar usuário do Calendly:", error);
        Alert.alert("Erro", "Não foi possível carregar seus dados do Calendly.");
      }
    };

    fetchUserId();
  }, []);



  // Lista de disponível
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
          const response = await axios.get(EVENT_TYPE_URL, {
            headers: { Authorization: `${TOKEN}` },
            params: {
              start_time: currentStartDate.toISOString(),
              end_time: currentEndDate.toISOString(),
              event_type: "https://api.calendly.com/event_types/840af3c7-4471-465a-ae90-94c82ac2427c"
            },
          });

          const data = response.data?.collection || [];

          if (data.length === 0) {
            break;
          }

          results.push(...data);

          currentStartDate = new Date(currentEndDate);
          currentEndDate = new Date(currentStartDate);
          currentEndDate.setDate(currentEndDate.getDate() + 7);
        }

        const mappedCards: EventCard[] = results.map((event: any, index: number) => {
          const startTime = new Date(event.start_time);
          const endTime = new Date(startTime);
          endTime.setMinutes(startTime.getMinutes() + 30);
          console
          return {
            id: `event-${index}`,
            nomeDia: startTime.toLocaleString("pt-BR", { weekday: "long" }) || "Evento",
            dia: startTime.getDate().toString().padStart(2, "0"),
            mes: (startTime.getMonth() + 1).toString().padStart(2, "0"),
            year: startTime.getFullYear().toString(),
            time: `${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            prof: "Ednei Soares",
            status: controle ? "bloqueado" : "disponivel", // Se controle for true, o status será "bloqueado"
            scheduling_url: event.scheduling_url,
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
  }, [occupiedTimes]); // Dependendo dos horários ocupados


  //lista de ocupados
  useEffect(() => {
    const fetchCalendlyData = async () => {
      if (!userUrl) return;
      //${HORARIO_URl}?user=${userUrl}
  
      try {
        const EVENT_URL = `https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/3118a603-1be7-40c2-800a-8f84ac539324`;
  
        const response = await axios.get(EVENT_URL, {
          headers: { Authorization: `${TOKEN}` },
        });
  
        const eventTypes = response.data?.collection;
        console.log("eventos ->"+eventTypes)
        if (!eventTypes) throw new Error("Nenhum evento encontrado.");
  
        const activeEvents = eventTypes.filter((event: any) => event.status === "active");
        console.log("eventos ativos->"+activeEvents)
        const filteredEvents = activeEvents
          .filter((event: any) => event.name.includes(EVENTO))
          .filter((event: any) => {
            const startTime = new Date(event.start_time);
            const hoje = new Date();
            // Zera hora/minuto/segundo do "hoje" para comparar só por data
            hoje.setHours(0, 0, 0, 0);
            return startTime >= hoje;
          });
  
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
  
        setAvailableCards(mappedCards);
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
      setSelectedCard(selectedCard);
      setShowDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedCard && selectedCard.scheduling_url) {
      Linking.openURL(selectedCard.scheduling_url).catch((err) => console.error("Erro ao abrir o link de agendamento", err));
    }
    setShowDialog(false);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const groupedCards: GroupedCards = availableCards.reduce((acc, card) => {
    const dateKey = `${card.year}-${card.mes}-${card.dia}`;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        nomeDia: card.nomeDia,
        dia: card.dia,
        mes: card.mes,
        year: card.year,
        cards: [],
      };
    }
    acc[dateKey].cards.push(card);
    return acc;
  }, {} as GroupedCards);

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
