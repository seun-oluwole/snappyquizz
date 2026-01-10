import { createContext, useContext, useState } from "react";
import type { ModalContextType } from "../utils/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function ModalContextProvider({ children }: React.PropsWithChildren) {
  const [restartGameModal, setRestartGameModal] = useState<boolean>(false);
  const [getStartedModal, setGetStartedModal] = useState<boolean>(false);

  const modalContextValue: ModalContextType = {
    restartGameModal,
    setRestartGameModal,
    getStartedModal,
    setGetStartedModal
  }

  return (
    <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>
  )

}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }
  return context;
};
