import { createContext } from "react";
import { Alert } from "./provider";

export interface AlertContext {
  alerts: Alert[]
  addAlert: (alert: Alert) => string;
  dismissAlert: (id: string) => void
}

export const AlertContext = createContext<AlertContext>(null!);
