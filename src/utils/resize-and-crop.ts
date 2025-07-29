interface Props {
  file: File | Blob,
  position: { x: number, y: number },
  scale: number
}

export const resizeAndCropImage = ({
  file,
  position,
  scale
}: Props): Promise<Blob | null> => {



  return new Promise((resolv) => {
    function processImage(imageElement: HTMLImageElement) {
      const canvas = document.createElement('canvas');
      // declara a altura e a largura da tela do usuário
      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;

      // Declara a altura e a largura da image 
      const naturalWidth = imageElement.naturalWidth;
      const naturalHeight = imageElement.naturalHeight;

      // Define o tamanho do canvas para o tamanho da tela do usuário
      canvas.width = screenWidth;
      canvas.height = screenHeight;

      // Calcula as proporções da tela e da imagem
      const imageRadio = naturalWidth / naturalHeight
      const screenRadio = screenWidth / screenHeight

      // Define o tamanho da imagem
      let width = naturalWidth;
      let height = naturalHeight;

      // Redimensiona a imagem para preencher a tela
      if (naturalHeight < screenHeight || naturalWidth < screenWidth) {
        if (imageRadio > screenRadio) {
          height = screenHeight;
          width = height * imageRadio
        } else {
          width = screenWidth;
          height = screenWidth / imageRadio
        }
      }

      // Calcula a posição original usando a posição definida no preview
      const positionX = Math.abs(position.x) / scale;
      const positionY = Math.abs(position.y) / scale;

      // Calcula proporção entre o tamanho original e o tamanho redimensionado
      const scaleX = naturalWidth / width;
      const scaleY = naturalHeight / height;

      // Converte as coordenadas do corte para a escala da imagem original
      const sourceX = positionX * scaleX;
      const sourceY = positionY * scaleY;
      const sourceWidth = screenWidth * scaleX;
      const sourceHeight = screenHeight * scaleY;

      // Verifica se o contexto existe
      const ctx = canvas.getContext('2d');
      if (!ctx) return;


      // Realiza tanto o redimensionamento quando o corte da imagem
      ctx.drawImage(
        imageElement,
        sourceX,      // O X do corte na imagem ORIGINAL
        sourceY,      // O Y do corte na imagem ORIGINAL
        sourceWidth,  // A largura do corte na imagem ORIGINAL
        sourceHeight, // A altura do corte na imagem ORIGINAL
        0, 0,
        screenWidth,    // A largura final no canvas
        screenHeight    // A altura final no canvas
      );

      // Transforma a imagem em url 
      canvas.toBlob(blob => {
        resolv(blob)
      })
    }

    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    imageElement.onload = () => {
      processImage(imageElement)
    }
  })
}