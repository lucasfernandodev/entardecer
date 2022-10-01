interface scropSizes {
  width: number;
  height: number;
}

export default async function crop(url: string, scropSizes: scropSizes) {
  const windowWidth = scropSizes.width;
  const windowHeight = scropSizes.height;

  return new Promise((resolve, reject) => {
    const inputImage = new Image();

    inputImage.onload = () => {
      let positionImageX = 0;
      let positionImageY = 0;

      const imageWidth = inputImage.naturalWidth;
      const imageHeight = inputImage.naturalHeight;

      // Imagem é menor que a tela
      if (imageWidth <= windowWidth && imageHeight <= windowHeight) {
        resolve({
          crop: false,
          msg: 'A imagem está no tamanho correto e não precisa ser cortada',
        });
      }

      // Posiciona o corte no centro da imagem
      if (imageWidth > windowWidth && imageHeight > windowHeight) {
        positionImageX = (imageWidth - windowWidth) * .5;
        positionImageY = (imageHeight - windowHeight) * .5;
      }

      // Posiciona o corte na horizontal
      if (imageWidth > windowWidth && imageHeight <= windowHeight) {
        positionImageX = (imageWidth - windowWidth) * .5;
      }

      // Posiciona o corte na vertical
      if (imageWidth <= windowWidth && imageHeight > windowHeight) {
        positionImageY = (imageHeight - windowHeight) * .5;
      }

      const outputImage = document.createElement('canvas');
      outputImage.width = windowWidth,
      outputImage.height = windowHeight
      const ctx = outputImage.getContext('2d');

     
      if (ctx) {
        ctx.drawImage(inputImage, (0 - positionImageX), (0 - positionImageY));
        resolve({
          crop: true,
          data: outputImage.toDataURL(),
        });
      }
    };

    inputImage.onerror = (err) => {
      reject({
        crop: false,
        msg: err,
      });
    };

    // start loading our image
    inputImage.src = url;
  });
}
