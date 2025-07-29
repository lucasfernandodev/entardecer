import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface IShortcutPreview extends DBSchema {
  shortcuts: {
    value: {
      title: string;
      url: string;
      icon?: string
      createdAt: number
    },
    key: string;
    indexes: { url: string, icon?: string, title: string, createdAtIndex: string }
  };
}

interface IPreviewDatabase extends DBSchema {
  preview: {
    value: {
      position: {
        x: number, y: number
      },
      image: Blob
    }
    key: number,
  }
}

interface ISettingDatabase extends DBSchema {
  setting: {
    value: any
    key: string;
    indexes: { id: string }
  };
}

interface IBackgroundImageDatabase extends DBSchema {
  backgroundImage: {
    value: {
      image: Blob;
    }
    key: number,
  }
}

export type TypeDatabase = () => Promise<{
  shortcut: IDBPDatabase<IShortcutPreview>,
  preview: IDBPDatabase<IPreviewDatabase>,
  setting: IDBPDatabase<ISettingDatabase>,
  backgroundImage: IDBPDatabase<IBackgroundImageDatabase>
}>

export const Database: TypeDatabase = async () => {
  return {
    shortcut: await openDB<IShortcutPreview>('shortcut', 1, {
      upgrade: (db) => {
        const objectStore = db.createObjectStore('shortcuts', { keyPath: 'url' });
        objectStore.createIndex('url', 'url', { unique: true });
        objectStore.createIndex('icon', 'icon', { unique: false });
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('createdAtIndex', 'createdAt', { unique: true })
        objectStore.transaction.oncomplete = () => {
          console.log('Table shortcut created!')
        }
      }
    }),
    preview: await openDB<IPreviewDatabase>('preview', 1, {
      upgrade: db => {
        const preview = db.createObjectStore('preview');

        preview.transaction.oncomplete = () => {
          console.info('Table preview created!')
        }
      }
    }),
    backgroundImage: await openDB<IBackgroundImageDatabase>('backgroundImage', 1, {
      upgrade: db => {
        const backgroundImage = db.createObjectStore('backgroundImage');

        backgroundImage.transaction.oncomplete = () => {
          console.info('Table preview created!')
        }
      }
    }),
    setting: await openDB<ISettingDatabase>('setting', 1, {
      upgrade: db => {
        const objectStore = db.createObjectStore('setting', { keyPath: 'id' });

        objectStore.transaction.oncomplete = () => {
          console.log('Table setting created!')
        }
      }
    })
  }
} 
