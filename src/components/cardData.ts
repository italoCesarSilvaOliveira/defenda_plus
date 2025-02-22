export interface Card {
    id: number;
    nomeDia: string;
    dia: string;
    mes: string;
    prof: string;
    time: string;
    status: "disponivel" | "marcado" | "ocupado" | "bloqueado";
  }
  
  export const cardData: Card[] = [
    { id: 1, nomeDia: 'Segunda-feira', dia: '24', mes: 'Fevereiro', prof: 'Professor Leonardo', time: '10:00 AM', status: 'disponivel' },
    { id: 2, nomeDia: 'Terça-feira', dia: '25', mes: 'Fevereiro', prof: 'Professor Leonardo', time: '10:00 AM', status: 'disponivel' },
    { id: 3, nomeDia: 'Quarta-feira', dia: '26', mes: 'Fevereiro', prof: 'Professor Leonardo', time: '10:00 AM', status: 'ocupado' },
    { id: 4, nomeDia: 'Quinta-feira', dia: '27', mes: 'Fevereiro', prof: 'Professor Leonardo', time: '10:00 AM', status: 'disponivel' },
    { id: 5, nomeDia: 'Terça-feira', dia: '25', mes: 'Fevereiro', prof: 'Professor Leonardo', time: '09:00 AM', status: 'disponivel' },
  ];
  