import { useContext, useEffect, useRef, useState } from "react";
import TitleText from "../../../../components/TitleText";
import * as Styled from "./index.styles";
import SimulationContext from "../../../../context/simulation";
import useStockValues from "../../../../hooks/stockValue/useStockValues";
import { Button, Overlay, Stack, Table, Tooltip } from "react-bootstrap";
import axios from "axios";

interface FinancialsProps {
  code: string;
};

const Financials = (props: FinancialsProps) => {
  const simulation = useContext(SimulationContext);
  const values = useStockValues(props.code, simulation.date).data?.values ?? [];

  values.sort((v1, v2) => {
    if (v2.date > v1.date)
      return 1;
    return -1;
  });

  return (
    <Styled.Container>
      <TitleText text="Financials indicators"/>
      <Table style={{ marginTop: "8px" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>PER</th>
            <th>PBR</th>
            <th>PSR</th>
            <th>PCR</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => (
            <tr key={value.date}>
              <td><Styled.DateLabel>{value.date}</Styled.DateLabel></td>
              <td><Styled.NormalLabel>{value.per}</Styled.NormalLabel></td>
              <td><Styled.NormalLabel>{value.pbr}</Styled.NormalLabel></td>
              <td><Styled.NormalLabel>{value.psr}</Styled.NormalLabel></td>
              <td><Styled.NormalLabel>{value.pcr}</Styled.NormalLabel></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Styled.Container>
  )
};

export default Financials;