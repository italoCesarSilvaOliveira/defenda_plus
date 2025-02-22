import React from "react";

import {
  Header,
  Card,
} from "./styles";

interface Props {
  nomeDia: string;
  dia: string;
  mes: string;
}

export const CardDay = ({
  nomeDia,
  dia,
  mes,
}: Props) => {

  return (
    <Card>
      <Header>
        {nomeDia} | {dia} {mes}
      </Header>
    </Card>
  );
};