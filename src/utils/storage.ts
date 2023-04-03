interface storage {
  create: <T>(key: string, data: T) => void,
  read: <T>(key: string) => null | T,
  update: <T>(key: string, data: T) => void,
  delete: (key: string) => void,
  clear: () => void
}

export const storage: storage = {
  create: (key, data) => {
    const isStorage = localStorage.getItem(key);

    if (isStorage) throw new Error('O chave informada já existe no localstorage');

    localStorage.setItem(key, JSON.stringify(data));

  },

  read: (key) => {
    const isStorage = localStorage.getItem(key);

    if (!isStorage) return null
    return JSON.parse(isStorage)
  },

  update: (key, data) => {
    const isStorage = localStorage.getItem(key);

    if (!isStorage) throw new Error('O chave informada não existe no localstorage');

    localStorage.setItem(key, JSON.stringify(data));
  },

  delete: (key) => {
    const isStorage = localStorage.getItem(key);
    if (!isStorage) throw new Error(`O chave informada não existe no localstorage`);

    localStorage.removeItem(isStorage);
  },

  clear: () => {
    localStorage.clear()
  }
}
