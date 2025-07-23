import { useState } from "react";

interface DropzoneOptions {
  isEnabled: boolean;
  onDrop: (files: FileList) => void;
}

export const useDropzone = ({
  isEnabled,
  onDrop
}: DropzoneOptions) => {

  const [isDragActive, setIsDragActive] = useState(false);

  const handle = (
    e: React.DragEvent<HTMLDivElement>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handle: (currentTarget: HTMLDivElement) => void = () => { }
  ) => {
    e.preventDefault();

    if (!isEnabled) {
      console.log('Dropzone disabled');
      return;
    }

    if (e.currentTarget) {
      handle(e.currentTarget)
    } else {
      console.error('dropzone not found on ', e)
    }
  }

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => handle(e, () => {
    setIsDragActive(true)
  })

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => handle(
    e, () => {
      setIsDragActive(false)
    }
  )

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => handle(
    e, () => {
      setIsDragActive(false)
    }
  )


  const dragDrop = (e: React.DragEvent<HTMLDivElement>) => handle(
    e, () => {
      if (e.dataTransfer) {
        const files = e.dataTransfer.files;
        onDrop(files);
        setIsDragActive(false)
      }
    }
  )

  return {
    dragEnter,
    dragLeave,
    dragOver,
    dragDrop,
    isDragActive
  }
}