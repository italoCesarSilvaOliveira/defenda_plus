import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Container } from "./styles";
import { CalendarComponent } from "../../components/CalendarComponent";
import { CardInfo } from "../../components/CardInfo";
import { CardConfirm } from "../../components/CardConfirm";
import { CardDay } from "../../components/CardDay";
import { TOKEN, HORARIO_URl, USER, EVENTO, API_BASE, EVENT_URL, PROFESSOR } from "@env";
import { getControle, setControle } from "../../controle";

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
  const [controle, setControleState] = useState<boolean>(getControle());
  const [organization, setOrganization] = useState<string | null>(null);

  // Obter a URL e o ID do usuário
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Buscar sempre novos dados ao mudar o token
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
        const organization = data.resource.current_organization;
  
        if (extractedUserId) {
          setUserId(extractedUserId);
          await AsyncStorage.setItem("calendly_user_url", userUri);
        }
  
        if (organization) {
          setOrganization(organization);
          await AsyncStorage.setItem("calendly_organization", organization);
        }
  
        setUserUrl(userUri);
      } catch (error) {
        console.error("Erro ao buscar usuário do Calendly:", error);
        Alert.alert("Erro", "Não foi possível carregar seus dados do Calendly.");
      }
    };
  
    fetchUserId();
  }, [TOKEN]);

  // lista de eventos disponíveis
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
          const evento = await axios.get(EVENT_URL, {
            headers: { Authorization: `${TOKEN}` },
            params: { organization },
          });
  
          const eventoUrl = evento.data?.collection?.[0]?.uri || null;
  
          if (!eventoUrl) break;
  
          const response = await axios.get(EVENT_TYPE_URL, {
            headers: { Authorization: `${TOKEN}` },
            params: {
              start_time: currentStartDate.toISOString(),
              end_time: currentEndDate.toISOString(),
              event_type: eventoUrl,
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
 
          return {
            id: `event-${index}`,
            nomeDia: startTime.toLocaleString("pt-BR", { weekday: "long" }) || "Evento",
            dia: startTime.getDate().toString().padStart(2, "0"),
            mes: (startTime.getMonth() + 1).toString().padStart(2, "0"),
            year: startTime.getFullYear().toString(),
            time: `${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            prof: PROFESSOR, //vem do env por conta do retorno da api não retornar o nome 
            status: controle ? "bloqueado" : "disponivel",
            scheduling_url: event.scheduling_url,
          };
        });
  
        setAvailableCards((prevCards) => {
          const newCards = mappedCards.filter(
            (newCard) => !prevCards.some((existingCard) => existingCard.id === newCard.id)
          );
  
          return newCards.length === 0 ? prevCards : [...prevCards, ...newCards];
        });
      } catch (error: any) {
        console.error("Erro ao buscar horários disponíveis:", error.response ? error.response.data : error.message);
        Alert.alert("Erro", "Não foi possível carregar os horários disponíveis.");
      }
    };
  
    if (TOKEN && organization) {
      fetchAllAvailableTimes();
    }
  }, [TOKEN, organization, occupiedTimes]);


  //lista de marcados e ocupados 
  useEffect(() => {
    const fetchCalendlyData = async () => {
      if (!userUrl) return;

      try {
        const response = await axios.get(HORARIO_URl, {
          headers: {
            Authorization: `${TOKEN}`,
          },
          params: {
            user: userUrl,
            status: 'active',
          },
        });

        const activeEvents = response.data?.collection;
        const filteredEvents = activeEvents
          .filter((event: any) => event.name.includes(EVENTO))
          .filter((event: any) => {
            const startTime = new Date(event.start_time);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            return startTime >= hoje;
          });

        const mappedCards: EventCard[] = await Promise.all(filteredEvents.map(async (event: any, index: number) => {
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);
          let status: EventCard["status"] = "ocupado";

          try {
            const inviteesUrl = `${event.uri}/invitees`;
            const inviteesResponse = await axios.get(inviteesUrl, {
              headers: { Authorization: `${TOKEN}` },
            });

            const invitees = inviteesResponse.data?.collection || [];
            const foundInvitee = invitees.find((invitee: any) =>
              invitee?.name?.toUpperCase()?.trim() === USER?.toUpperCase()?.trim()
            );
            console.log(index)
            if (foundInvitee) {
              status = "marcado";
              if (controle === false){
                const eventPosition = index;
              const novoControle = !controle;
              setControle(novoControle);
              }
            }
          } catch (inviteeError) {
            console.warn(`Erro ao buscar convidados do evento ${event.uri}:`, inviteeError);
          }

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
        }));

        // Atualiza os cards diretamente sem verificar mudanças
        setAvailableCards(mappedCards);

      } catch (error: any) {
        console.error("Erro ao buscar dados do Calendly:", error.response ? error.response.data : error.message);
        Alert.alert("Erro", "Não foi possível carregar os eventos.");
      }
    };

    // Recarregar os dados toda vez que userUrl mudar
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

  const groupedCards: GroupedCards = availableCards
    .sort((a, b) => {
      const aTime = new Date(`${a.year}-${a.mes}-${a.dia}T${a.time.split(' - ')[0]}:00`);
      const bTime = new Date(`${b.year}-${b.mes}-${b.dia}T${b.time.split(' - ')[0]}:00`);
      return aTime.getTime() - bTime.getTime();
    })
    .reduce((acc, card) => {
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
