import { ReactNode, useState } from "react";
import { AlertContext } from "./context";
import { Alert, AlertWrapper } from "../../components/Organisms/Setting/Alert";

interface AlertProvider {
  children: ReactNode;
}

export interface Alert {
  id?: string;
  variation: 'warning' | 'error' | 'success';
  title?: string;
  description?: string
  timeout?: number;
  handleDismiss?: Function;
}


export const AlertProvider = ({ children }: AlertProvider) => {
  const [alerts, setAlerts] = useState([] as Alert[])

  const addAlert = (alert: Alert) => {
    const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
    setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
    return id;
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert?.id !== id));
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      {children}
      <AlertWrapper>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variation={alert.variation}
            description={alert.description}
            title={alert.title}
            handleDismiss={() => { dismissAlert(alert.id || 'a') }}
          />
        ))}
      </AlertWrapper>
    </AlertContext.Provider>
  )
}