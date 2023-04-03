import { useState } from 'react';
import { message } from '../services/chrome/message';
import { db } from '../database/indexDB';
import blobToBase64 from '../utils/image/blobToBase64';
import crop from '../utils/image/crop';

interface imagecroped {
  data?: Blob;
  crop: boolean;
}

export default function useImageUpload() {

  const [image, setImage] = useState<null | string>(null);
  const [error, setError] = useState<string[]>([]);
  const [onFinish, setOnFinish] = useState<boolean>(false);

  const windowSize = { width: window.innerWidth, height: window.innerHeight };

  const imageTypesAccepts: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
  ];

  async function storeImage(image64: string) {
    const { bg_homepage: database } = await db();

    const isImage = await database.getAll('image');

    if (isImage.length === 0) {
      await database.add('image', {
        data: image64,
        id: 'bg_homepage',
      });
    } else {
      await database.put('image', {
        data: image64,
        id: 'bg_homepage',
      });
    }

    setOnFinish(true)
  }

  async function handleImage(file: File) {

    const fileSize = file.size / 1024;

    if (fileSize > 3072) {
      setError([
        ...error,
        '- São aceitas somentes imagem de tamanho maximo 3MB',
      ]);
      setOnFinish(true);
    }

    if (!imageTypesAccepts.includes(file.type)) {
      setError([...error, '- Arquivo de imagem invalido']);
      setOnFinish(true);
    }

    if (error.length === 0) {
      const imageUrl = URL.createObjectURL(file);
      const isCropImage = (await crop(imageUrl, windowSize)) as imagecroped;

      const image64 = isCropImage.data
        ? isCropImage.data
        : await blobToBase64(file);

      try {
        await storeImage(image64 as string);
        setImage(imageUrl);

        await message.send({
          from: 'configuration',
          to: 'homepage',
          subject: 'update',
        });
      } catch (error) {
        console.log(error);
        setOnFinish(true);
      }
    }
  }


  return {
    onFinish: onFinish,
    error: error,
    image: image,
    storeImage: (file: File) => handleImage(file),
    clearInput: () => {
      setImage(null)
      setError([])
      setOnFinish(false)
    }
  }
}
