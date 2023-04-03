import { ISetupConfig } from "../types/setupConfig";
import { storage } from "../utils/storage";


const setup = () => {

  const config: ISetupConfig = {
    category: ['all'],
    theme: 'dark',
  };

  try {
    const keys = Object.keys(config);
    keys.map(key => storage.create(key, config[key]));
  } catch (error: unknown) {
    console.log("unable to configure initial settings");
  }
}

export { setup }
