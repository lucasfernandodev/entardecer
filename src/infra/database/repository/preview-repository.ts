import { Database, TypeDatabase } from "../database";

export interface IPreviewData {
  image: Blob;
  position: { x: number, y: number }
}

const PREVIEW_KEY = 1;

export class PreviewRepository {
  private database: TypeDatabase;

  constructor(database: typeof Database) {
    this.database = database;
  }

  private getDB = async () => {
    const { preview } = await this.database();
    return preview;
  }

  public set = async (data: IPreviewData) => {
    const isEmpty = await this.isEmpty()
    const db = await this.getDB();
    const tr = db.transaction('preview', 'readwrite')
    const store = tr.objectStore('preview');

    if (isEmpty) {
      await store.add(data, PREVIEW_KEY);
      await tr.done;
      return;
    }

    await store.put(data, PREVIEW_KEY);
    await tr.done;
  }

  public isEmpty = async () => {
    const db = await this.getDB();
    const tr = db.transaction('preview', 'readonly');
    const store = tr.objectStore('preview');
    const result = await store.count(PREVIEW_KEY);
    return result === 0;
  }

  public get = async () => {
    const db = await this.getDB()
    const tr = db.transaction('preview', 'readonly')
    const store = tr.objectStore('preview')
    const result = await store.get(PREVIEW_KEY)
    return result;
  }

  public delete = async () => {
    const db = await this.getDB()
    const tr = db.transaction('preview', 'readwrite')
    const store = tr.objectStore('preview')
    await store.delete(PREVIEW_KEY)
    await tr.done;
  }
}