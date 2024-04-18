import React, { useState } from "react";
import useProceedSimulationDate from "../hooks/simulation/useProceedNextSimulationDate";
import useRestartSimulation from "../hooks/simulation/useRestartSimulation";
import useCurrentSimulationDate from "../hooks/simulation/useCurrentSimulationDate";

interface SimulationContextValue {
  date: string;
  proceedDate: (length: number) => void;
  restart: () => void;
}

const SimulationContext = React.createContext<SimulationContextValue>({} as SimulationContextValue);

export const SimulationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const date = (useCurrentSimulationDate().data?.date ?? localStorage.getItem("simulationDate")) ?? "";
  const { mutate: updateDate } = useProceedSimulationDate();
  const { mutate: restart } = useRestartSimulation();

  return <SimulationContext.Provider value={{ date, proceedDate: updateDate, restart }}>{children}</SimulationContext.Provider>;
};

export default SimulationContext;
