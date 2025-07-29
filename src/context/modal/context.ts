import { createContext } from "react";

interface ModalContext {
  toggleVisibility: () => void;
}

export const ModalContext = createContext<ModalContext>(null!);