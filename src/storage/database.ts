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


interface bg_homepageDB extends DBSchema {
  image: {
    value: {
      data: unknown,
      id: string
    };
    key: string;
    indexes: { 'by-data': string};
  };
}


export async function db() {
  const shortcuts = await openDB<MyDB>('shortcuts', 1, {
    upgrade(db) {

      const productStore = db.createObjectStore('website', {
        keyPath: 'url',
      });

      productStore.createIndex('by-url', 'url');
      productStore.createIndex('by-category', 'category');
    },
  });


  const bg_homepage = await openDB<bg_homepageDB>('bg_homepage', 1, {
    upgrade(db) {

      const store = db.createObjectStore('image', {
        keyPath: 'id',
      });

      store.createIndex('by-data', 'data');
    },
  });

  return {shortcuts, bg_homepage};

}