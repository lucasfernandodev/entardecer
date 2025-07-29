import { useContext } from "react"
import { SettingContext } from "../context/setting/context"

export const useSetting = () => {
  const context = useContext(SettingContext);
  return context;
}