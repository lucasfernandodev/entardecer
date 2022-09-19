import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  website: {
    value: {
      title: string,
      category: string,
      url: string,
      autoload: string,
      darkType: boolean,
      url_favicon: string | null
    };
    key: string;
    indexes: { 'by-url': string ,'by-category': string};
  };
}


export async function db() {
  const db = await openDB<MyDB>('shortcuts', 1, {
    upgrade(db) {

      const productStore = db.createObjectStore('website', {
        keyPath: 'url',
      });

      productStore.createIndex('by-url', 'url');
      productStore.createIndex('by-category', 'category');
    },
  });

  return db;

}