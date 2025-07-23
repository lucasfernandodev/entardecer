import { decode, encode } from "blurhash";

export const generatePlaceholder = (img: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return reject(new Error('Canvas context não suportado'));


    ctx.drawImage(img, 0, 0);

    const placeholderEncode = encode(
      ctx.getImageData(0, 0, img.width, img.height)?.data,
      img.width, img.height, 4, 4
    )


    const pixels = decode(placeholderEncode, 16, 16);
    const decodeCanvas = document.createElement('canvas');
    decodeCanvas.width = 16;
    decodeCanvas.height = 16;
    const decodeCtx = decodeCanvas.getContext('2d')!;

    // 3) coloca os pixels no canvas
    const imgData = new ImageData(pixels, 16, 16);
    decodeCtx.putImageData(imgData, 0, 0);

    const image = decodeCanvas.toDataURL('image/jpeg', 0.5)
    resolve(image)
  });
}