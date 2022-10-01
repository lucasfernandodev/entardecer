import { storage } from "../../storage/storage";

export default function configStorage() {
  interface config {
    [key: string]: any;
  }
  const config: config = {
    category: ['all'],
    theme: 'dark',
    autoload: [],
  };


  try {
    const arrayNames = Object.keys(config);
    arrayNames.forEach((name: string) => {
      const item = config[name];

      if(storage.read(name)?.data === null){
       
        const save = storage.create(name, item);
        if(typeof save?.data !== 'undefined'){
          console.log(`storage ${name} criado com sucesso`)
        }
      }
    });
  } catch (error: any) {
    console.log(error.msg);
  }
}
