import { ReactNode, useState } from "react"
import { ModalContext } from "./context"
import { Modal } from "../../components/shared/Modal"

export const ModalProvider = ({ children }: { children: ReactNode }) => {

	const [isHidden, setIsHidden] = useState(true);

	return (
		<ModalContext value={{ toggleVisibility: () => setIsHidden(!isHidden) }}>
			{children}
			{<Modal isHidden={isHidden} onClose={() => setIsHidden(!isHidden)} />}
		</ModalContext>
	)
}