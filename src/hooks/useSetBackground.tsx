import { useEffect, useState } from "react";
import { Database } from "../database/database";
import { BackgroundImageRepository } from "../database/repository/background-image-repository";
import { PreviewRepository } from "../database/repository/preview-repository";
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

  const { isLoading, data: response } = useFetch<any>({
    queryFn: fn,
    isEnabled: shouldFetch
  })


  useEffect(() => {
    if (!isEnabled || isLoading || !response) return;
    if (isCrop) {
      setBackground(response.image)
    } else {
      console.log(response.image.size)
      setBackground(URL.createObjectURL(response.image))
    }
  }, [isLoading, response, isEnabled])

  console.log('background', background);
  return { background }
}