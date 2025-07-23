import { Database, TypeDatabase } from "../database";

export interface IBackgroundImageProps {
  image: string;
}

const BACKGROUND_IMAGE_KEY = 1;

export class BackgroundImageRepository {
  private database: TypeDatabase;

  constructor(database: typeof Database) {
    this.database = database;
  }

  private getDB = async () => {
    const { backgroundImage } = await this.database();
    return backgroundImage;
  }

  public set = async (data: IBackgroundImageProps) => {
    const isEmpty = await this.isEmpty()
    const db = await this.getDB();
    const tr = db.transaction('backgroundImage', 'readwrite')
    const store = tr.objectStore('backgroundImage');
    if (isEmpty) {
      await store.add(data, BACKGROUND_IMAGE_KEY);
      await tr.done;
      return;
    }

    await store.put(data, BACKGROUND_IMAGE_KEY);
    await tr.done;
  }

  public isEmpty = async () => {
    const db = await this.getDB();
    const tr = db.transaction('backgroundImage', 'readonly');
    const store = tr.objectStore('backgroundImage');
    const result = await store.count(BACKGROUND_IMAGE_KEY);
    return result === 0;
  }

  public get = async () => {
    const db = await this.getDB()
    const tr = db.transaction('backgroundImage', 'readonly')
    const store = tr.objectStore('backgroundImage')
    const result = await store.get(BACKGROUND_IMAGE_KEY)
    return result;
  }

  public delete = async () => {
    const db = await this.getDB()
    const tr = db.transaction('backgroundImage', 'readwrite')
    const store = tr.objectStore('backgroundImage')
    await store.delete(BACKGROUND_IMAGE_KEY)
    await tr.done;
  }
}