import { useState } from 'react';
import { db } from '../storage/database';

export default function useImageBackgroundLoading() {
  const [backgroundImage, setBackgroundImage] = useState<null | string>(null);

  ;(async() => {
    const { bg_homepage: database } = await db();
    const isImage = await database.getAll('image');

    if (isImage.length > 0) {
      setBackgroundImage(isImage[0].data);
    }
  })();

  return [backgroundImage, setBackgroundImage];
}
