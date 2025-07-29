import { useEffect, useState } from "react"
import { PreviewRepository } from "../infra/database/repository/preview-repository";
import { Database } from "../infra/database/database";
import { useFetch } from "./useFetch";

export const usePreviewStore = () => {
  const [preview, setPreview] = useState<Blob | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isPreviewDbFetchFinish, setIsPreviewDbFetchFinish] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })

  const getPreviewImage = async () => {
    const repository = new PreviewRepository(Database);
    const isPreview = await repository.get();
    return isPreview;
  }

  const { data, isLoading } = useFetch({ queryFn: getPreviewImage });

  useEffect(() => {
    if (!isLoading && data) {
      data.image && setPreview(data.image);
      setInitialPosition(data.position);
      setIsPreview(true);
    }
    if (!isLoading) {
      setIsPreviewDbFetchFinish(true)
    }
  }, [data, isLoading])

  const updatePreview = (image: Blob) => {
    if (!image) {
      console.log('Update preview failed', image);
      return;
    }
    setPreview(image)
    setIsPreview(true)
  }

  return {
    isPreviewDbFetchFinish, isPreview, preview, setPreview: updatePreview, initialPosition
  }
}