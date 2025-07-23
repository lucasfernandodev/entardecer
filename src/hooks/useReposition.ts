import { useEffect, useRef, useState } from "react"

interface RepositionProps {
  image: HTMLImageElement | null;
  previewContainer: HTMLElement | null
}

interface Position {
  x: number,
  y: number
}

export const useReposition = ({
  image,
  previewContainer
}: RepositionProps) => {
  const [oldPosition, setOldPosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReposition, setIsReposition] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 })
  const [isGrab, setIsGrab] = useState(false)

  const activeReposition = () => {
    setIsReposition(true)
    setOldPosition(position)
  }

  const savePosition = () => {
    setIsReposition(false);
    setOldPosition(position);
  }

  const cancelReposition = () => {
    setPosition(oldPosition);
    positionRef.current = oldPosition;
    setIsReposition(false)
  }

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
  }


  useEffect(() => {
    if (!isReposition || !image || !previewContainer) return;

    let startX: number, startY: number;
    let isDragging = false;

    const mouseDownHandle = (e: MouseEvent) => {
      startX = e.clientX - positionRef.current.x;
      startY = e.clientY - positionRef.current.y;
      isDragging = true;
    }

    const mouseMoveHandle = (e: MouseEvent) => {
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

    const mouseUpHandle = () => {
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
    activeReposition,
    savePosition,
    cancelReposition,
    resetPosition,
    isGrab,
    updatePosition: (position: Position) => {
      setPosition(position)
      positionRef.current = position
    }
  }
}