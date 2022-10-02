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
        let px = (imageWidth - windowWidth) * .5;
        let py = (imageHeight - windowHeight) * .5;
        positionImageX = px > 0 ?   (0 - px) : 0;
        positionImageY = py > 0 ?   (0 - py) : 0;
      }

      // Posiciona o corte na horizontal
      if (imageWidth > windowWidth && imageHeight <= windowHeight) {
        let px = (imageWidth - windowWidth) * .5;
        positionImageX = px > 0 ?  (0 - px)  : 0;
      }

      // Posiciona o corte na vertical
      if (imageWidth <= windowWidth && imageHeight > windowHeight) {
        let py = (imageHeight - windowHeight) * .5;
        positionImageY = py > 0 ?  (0 - py) : 0;
      }

      const outputImage = document.createElement('canvas');
      outputImage.width = windowWidth,
      outputImage.height = windowHeight
      const ctx = outputImage.getContext('2d');

      if(positionImageX <= 0 && positionImageY <= 0){
        resolve({
          crop: false,
          msg: 'A imagem está no tamanho correto e não precisa ser cortada',
        });
      }else{
        if (ctx) {
          ctx.drawImage(inputImage,positionImageX, positionImageY);
          resolve({
            crop: true,
            data: outputImage.toDataURL(),
          });
        }
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
