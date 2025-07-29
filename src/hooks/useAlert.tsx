import { useContext, useRef, useState } from "react"
import { AlertContext } from "../context/alert/context"
import { Alert } from "../context/alert/provider";

export const useAlert = () => {
  const [alertIds, setAlertIds] = useState([] as string[]);
  const alertIdsRef = useRef(alertIds);
  const { addAlert, dismissAlert } = useContext(AlertContext);

  const addAlertWithId = (alert: Alert) => {
    const id = addAlert(alert);
    alertIdsRef.current.push(id);
    setAlertIds(alertIdsRef.current);
  }

  const clearAlerts = () => {
    alertIdsRef.current.forEach((id) => dismissAlert(id));
    alertIdsRef.current = [];
    setAlertIds([]);
  }
  return { addAlert: addAlertWithId, clearAlerts };
}