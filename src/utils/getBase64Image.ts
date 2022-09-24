export default function getBase64Image(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    

    const img = document.createElement('img');

    img.src = url;

    img.onload = () => {
      let canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
    
      let ctx = canvas.getContext('2d') as any;
    
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL('image/png');
      resolve( dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
    }

    img.onerror = (error) => {
      reject(error)
    }
  }) 
}
