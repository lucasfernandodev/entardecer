import { shortcutEventEmit } from "../../services/shortcut-event";
import { Database, TypeDatabase } from "../database";

export interface Shortcut {
  icon?: string;
  url: string;
  title: string;
  createdAt?: number
}

export class ShortcutRepository {
  private database: TypeDatabase;

  constructor(database: typeof Database) {
    this.database = database;
  }

  private getDB = async () => {
    const { shortcut } = await this.database();
    return shortcut;
  }

  public add = async (shortcut: Shortcut) => {
    const db = await this.getDB();
    const tr = db.transaction('shortcuts', 'readwrite')
    const objectStore = tr.objectStore('shortcuts')
    await objectStore.add({
      ...shortcut,
      createdAt: Date.now()
    })
    await tr.done;
    await shortcutEventEmit()
  }

  public put = async (url: string, shortcut: Shortcut) => {
    const isShortcut = await this.getByUrl(url);
    if (!isShortcut) {
      throw new Error('Shortcut not found')
    }

    const db = await this.getDB();
    const tr = db.transaction('shortcuts', 'readwrite')
    const objectStore = tr.objectStore('shortcuts')

    await objectStore.put({
      ...shortcut,
      createdAt: shortcut.createdAt ?? Date.now()
    })
    await tr.done;
    await shortcutEventEmit()
  }

  public getByUrl = async (url: string) => {
    const db = await this.getDB();
    const transaction = db.transaction('shortcuts', 'readonly');
    const objectStore = transaction.objectStore('shortcuts');
    const result = await objectStore.get(url);
    return result;
  }

  public getAll = async () => {
    const db = await this.getDB();
    const transaction = db.transaction('shortcuts', 'readonly');
    const objectStore = transaction.objectStore('shortcuts');
    const result = await objectStore.getAll();
    return result;
  }

  public getAllByRecent = async () => {
    const db = await this.getDB();
    const transaction = db.transaction('shortcuts', 'readonly');
    const objectStore = transaction.objectStore('shortcuts');
    const index = objectStore.index('createdAtIndex');
    const result = await index.getAll();
    return result.reverse()
  }

  public delete = async (url: string) => {
    const db = await this.getDB();
    const tr = db.transaction('shortcuts', 'readwrite');
    const objectStore = tr.objectStore('shortcuts');
    await objectStore.delete(url);
    await tr.done;
    await shortcutEventEmit()
  }
}