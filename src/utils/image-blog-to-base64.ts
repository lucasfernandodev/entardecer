export async function imgToBase64ByBlob(img: HTMLImageElement): Promise<string> {
  // 1) Busca a URL da imagem como Blob
  const response = await fetch(img.src, { mode: 'cors' });
  const blob = await response.blob();

  // 2) FileReader para ler o Blob como data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(reader.error)
      }
    };  // será "data:image/...;base64,AAAA..."
    reader.readAsDataURL(blob);
  });
}