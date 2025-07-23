import { encode } from "@jsquash/avif";

const loadImage = async (file: Blob | File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(image.src)
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context não suportado'));
      ctx.drawImage(image, 0, 0);
      resolve(ctx.getImageData(0, 0, image.width, image.height))
    }
  })
}

export const minifyImage = async (image: Blob | File) => {
  const rawImage = await loadImage(image);
  const avifBuffer = await encode(rawImage);
  const blob = new Blob([avifBuffer], { type: 'image/avif' })
  return blob
}