import { TypeDatabase } from "../database";

export class SettingRepository {
  private database: TypeDatabase;

  constructor(database: TypeDatabase) {
    this.database = database;
  }

  private getDB = async () => {
    const { setting } = await this.database();
    return setting
  }

  public getById = async <T>(id: string) => {
    const db = await this.getDB();
    const tr = db.transaction('setting', 'readonly');
    const store = tr.objectStore('setting');
    const isSetting = await store.get(id)
    if (!isSetting) return null;
    return isSetting as T
  }

  public add = async <T>(id: string, setting: T) => {
    const isSetting = await this.getById(id);
    if (isSetting) {
      throw new Error(`A configuração ${id} já foi adicionada ao banco de dados`)
    }

    const db = await this.getDB();
    const tr = db.transaction('setting', 'readwrite');
    const store = tr.objectStore('setting');
    await store.add({ id, ...setting })
    await tr.done;
  }

  public update = async <T>(id: string, setting: T) => {
    const isSetting = await this.getById(id);
    if (!isSetting) {
      throw new Error(`A configuração ${id} não foi encontrada no banco de dados`)
    }

    const db = await this.getDB();
    const tr = db.transaction('setting', 'readwrite');
    const store = tr.objectStore('setting');
    await store.put({ id, ...setting })
    await tr.done;
  }

  public delete = async (id: string) => {
    const db = await this.getDB();
    const tr = db.transaction('setting', 'readwrite');
    const store = tr.objectStore('setting');
    await store.delete(id)
  }
}