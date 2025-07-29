import { useEffect, useState } from "react";
import { Database } from "../infra/database/database";
import { BackgroundImageRepository } from "../infra/database/repository/background-image-repository";
import { PreviewRepository } from "../infra/database/repository/preview-repository";
import { useFetch } from "./useFetch";

interface UseSetBackgroundImageProps {
  isCrop: boolean;
  isEnabled: boolean
}

export const useSetBackgroundImage = ({ isCrop, isEnabled }: UseSetBackgroundImageProps) => {
  const [background, setBackground] = useState('none')

  const fetchCroppedImage = async () => {
    console.log('using cropped image');
    const repo = new BackgroundImageRepository(Database);
    const image = repo.get()
    return image;
  }

  const fetchOriginalImage = async () => {
    console.log('using original image');
    const repo = new PreviewRepository(Database);
    const image = await repo.get();
    return image;
  }

  const shouldFetch = isEnabled && typeof isCrop !== 'undefined';
  const fn = isCrop ? fetchCroppedImage : fetchOriginalImage;

  const { isLoading, data: response } = useFetch({
    queryFn: fn,
    isEnabled: shouldFetch
  })


  useEffect(() => {
    if (!isEnabled || isLoading || !response) return;
    const nBackground = URL.createObjectURL(response.image)
    if (background !== nBackground) {
      URL.revokeObjectURL(background)
    }
    setBackground(nBackground)
  }, [isLoading, response, isEnabled])

  return { background }
}