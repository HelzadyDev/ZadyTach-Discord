import { WebhookClient } from 'discord.js';

function createWebhookClient(info: string | { url: string }, options?: any) {
  try {
    return new WebhookClient(
      typeof info === "string" ? { url: info } : info,
      options
    );
  } catch {
    return null;
  }
}

export { createWebhookClient };
