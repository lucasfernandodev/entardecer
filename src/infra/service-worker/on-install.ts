import { hydrateDatabase } from "../hydrate-database";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    hydrateDatabase().catch(console.error)
  }
});