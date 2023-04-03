import { storage } from "../utils/storage";

interface config {
  [key: string]: string | string[] | boolean;
}

function setup() {

  const config: config = {
    category: ['all'],
    theme: 'dark',
    autoload: [],
  };

  try {
    const keys = Object.keys(config);
    keys.map(key => storage.create(key, config[key]));
  } catch (error: unknown) {
    console.log("unable to configure initial settings");
  }
}

export { setup }
