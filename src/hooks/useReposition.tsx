import { useEffect, useRef, useState } from "react"

interface RepositionProps {
  previewContainer: HTMLElement | null;
  initialPosition: Position,
  image?: HTMLImageElement | null
}

interface Position {
  x: number,
  y: number
}

export const useReposition = ({
  previewContainer,
  initialPosition,
  image
}: RepositionProps) => {
  const [oldPosition, setOldPosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState(initialPosition);
  const positionRef = useRef(initialPosition)
  const [isReposition, setIsReposition] = useState(false);
  const [isGrab, setIsGrab] = useState(false);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition)
      positionRef.current = initialPosition
    }
  }, [initialPosition])




  const controller = {
    startReposition: () => {
      setIsReposition(true)
      setOldPosition(position)
    },

    savePosition: () => {
      setIsReposition(false);
      setOldPosition(position);
      positionRef.current = position;
    },

    cancelReposition: () => {
      setPosition(oldPosition);
      positionRef.current = oldPosition;
      setIsReposition(false)
    },

    resetPosition: () => {
      setPosition({ x: 0, y: 0 });
      positionRef.current = { x: 0, y: 0 };
      setIsReposition(false);
      setIsGrab(false);
    }
  }


  useEffect(() => {

    if (!isReposition || !image || !previewContainer) return;

    let startX: number, startY: number;
    let isDragging = false;

    const mouseDownHandle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLBRElement) {
        return
      }
      startX = e.clientX - positionRef.current.x;
      startY = e.clientY - positionRef.current.y;
      isDragging = true;
    }

    const mouseMoveHandle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLBRElement) {
        return
      }

      let x = e.clientX - startX;
      let y = e.clientY - startY;

      if (isDragging) {
        setIsGrab(true)
        const { height: previewHeight, width: previewWidth } = previewContainer.getBoundingClientRect();
        const { height: imageHeight, width: imageWidth } = image.getBoundingClientRect();

        if (y > 0) {
          y = 0;
        }

        if (x > 0) {
          x = 0; // não pode puxar a imagem pra direita demais
        }

        const minX = previewWidth - imageWidth;
        if (x < minX) {
          x = minX; // não pode puxar a imagem pra esquerda demais
        }

        const minY = previewHeight - imageHeight;
        if (y < minY) {
          y = minY;
        }

        setPosition({ x, y });
        positionRef.current = { x, y };
      }
    }

    const mouseUpHandle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLBRElement) {
        return
      }
      isDragging = false;
      setIsGrab(false)
    }

    previewContainer.addEventListener('mouseleave', mouseUpHandle)
    previewContainer.addEventListener('mouseup', mouseUpHandle)
    previewContainer.addEventListener('mouseout', mouseUpHandle)
    previewContainer.addEventListener('mousedown', mouseDownHandle)
    previewContainer.addEventListener('mousemove', mouseMoveHandle)

    return () => {
      previewContainer.removeEventListener('mouseleave', mouseUpHandle)
      previewContainer.removeEventListener('mouseup', mouseUpHandle)
      previewContainer.removeEventListener('mouseout', mouseUpHandle)
      previewContainer.removeEventListener('mousedown', mouseDownHandle)
      previewContainer.removeEventListener('mousemove', mouseMoveHandle)
    }
  }, [isReposition])



  return {
    position,
    isReposition,
    controller,
    isGrab
  }
}