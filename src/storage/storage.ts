const prefix = 'ent';

interface storage{
  create: (storage_name: string, data: {} | string | boolean) => {data?: any},
  read: (storage_name: string) => {data?: any},
  update: (storage_name: string, data: {} | string | boolean) => {},
  delete: (storage_name: string) => boolean,
}

export const storage: storage = {
  create: (storage_name, data) => {
    const isStorage = localStorage.getItem(prefix+'_'+storage_name);
   
    if(!isStorage){
      localStorage.setItem(prefix+'_'+storage_name, JSON.stringify(data));
  
      return {
        data: JSON.parse(localStorage.getItem(prefix+'_'+storage_name) as string)
      };
    }else{
      throw new Error('O storage informado já existe');
    }
  },

  read: (storage_name) => {
    const isStorage = localStorage.getItem(prefix+'_'+storage_name);

    if(isStorage){
      return {
        data: JSON.parse(isStorage as string)
      };
    }else{
      return {
        data: null
      }
    }
  },

  update: (storage_name, data) => {
    const isStorage = localStorage.getItem(prefix+'_'+storage_name);
    if(isStorage){
      localStorage.setItem(prefix+'_'+storage_name, JSON.stringify(data));

      return {
        data: JSON.parse(localStorage.getItem(prefix+'_'+storage_name) as string)
      };
    }else{
      throw new Error('O storage informado não existe');
    }
  },
  delete: (storage_name) => {
    const isStorage = localStorage.getItem(prefix+'_'+storage_name);
    if(isStorage){
      localStorage.removeItem(isStorage);

      if(localStorage.getItem(prefix+'_'+storage_name) === null) return true;

      throw new Error(`Não foi possivel deletar o storage ${storage_name}`);
    }else{
      throw new Error('O storage informado não existe');
    }
  },
}