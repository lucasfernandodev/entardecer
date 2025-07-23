export function imageToBlob(img: HTMLImageElement): Promise<Blob> {
  return new Promise((resolve, reject) => {

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return reject(new Error('Canvas context não suportado'));


    ctx.drawImage(img, 0, 0);
 

    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Falha ao converter para Blob'));
    }, 'image/jpeg'); // ou 'image/jpeg'

  });
}
