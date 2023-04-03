interface isImageDarkResponse {
  error: {
    message: string
  } | null,
  isDark: boolean | null,
}

function isImageDark(link: string): Promise<isImageDarkResponse> {
  const response: isImageDarkResponse = {
    error: null,
    isDark: null,
  };

  return new Promise((resolve, reject) => {

    // Verify Link
    if (typeof link === 'undefined' || link === null || link.length === 0) {

      response.error = {
        message: '[isImageDark]: Link invalido',
      };

      reject(response);
    }


    const fuzzy = 0.1;

    const img = document.createElement('img');
    img.src = link;

    img.style.display = 'none';
    document.body.appendChild(img);

    // Image loading
    img.onload = function (this: any) {

      // create canvas
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(this, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r, g, b, max_rgb;
        let light = 0, dark = 0;

        for (let x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];

          max_rgb = Math.max(Math.max(r, g), b);
          if (max_rgb < 128) dark++;
          else light++;
        }

        const dl_diff = (light - dark) / (this.width * this.height);

        if (dl_diff !== null) {
          response.isDark = dl_diff + fuzzy < 0 ? true : false
          resolve(response);
        } else {
          response.error = {
            message: '[isImageDark]: Não foi possivel verificar se a imagem é escura',
          };
          reject(response);
        }
      }
    };

    // Image not loaded
    img.onerror = (err) => {
      reject({
        msg: '[isImageDark]: Não foi possivel carregar a imagem',
        error: err,
      });
    };
  });
}

export default isImageDark;
