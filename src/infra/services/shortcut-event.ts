export const CHANNEL_NAME = 'database:shortcut';
export type ShortcutMessage = { type: 'database:shortcut:change' };

// cria e expõe o channel
export function createChannel() {
  return new BroadcastChannel(CHANNEL_NAME);
}

export const shortcutEventEmit = async () => {
  const channel = createChannel();
  channel.postMessage({ type: 'database:shortcut:change' });
  channel.close();
}

