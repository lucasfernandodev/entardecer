import { useEffect, useState } from "react"
import { PreviewRepository } from "../database/repository/preview-repository";
import { Database } from "../database/database";
import { useFetch } from "./useFetch";

interface usePreviewStoreProps {
  position: { x: number, y: number },
  onPositionUpdate: (position: { x: number, y: number }) => void
}

export const usePreviewStore = ({
  position,
  onPositionUpdate
}: usePreviewStoreProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (preview?.trim()) {
      setIsPreview(true)
    } else {
      setIsPreview(false);
    }
  }, [preview])

  const getPreviewImage = async () => {
    const repository = new PreviewRepository(Database);
    const isPreview = await repository.get();
    return isPreview;
  }

  const { data, isLoading } = useFetch({ queryFn: getPreviewImage });

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data)
      setPreview(URL.createObjectURL(data.image));
      onPositionUpdate(data.position);
    }
  }, [data, isLoading])

  const updatePreview = (image: string) => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    setPreview(image)
  }

  return {
    isLoading, isPreview, preview, position, setPreview: updatePreview
  }
}