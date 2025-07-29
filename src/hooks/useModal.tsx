import { useContext } from "react"
import { ModalContext } from "../context/modal/context"

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
}