import { Client, Collection, Guild, Message, TextBasedChannel } from 'discord.js';

function equalsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function includesIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase());
}

function findMessage(channel: TextBasedChannel) {
  const messages = channel.messages.cache;
  return {
    async all(limit = Infinity) {
      const messages2: Message[] = [];
      let lastMessageId: string | undefined;
      while (true) {
        const fetched: Collection<string, Message> = await channel.messages.fetch({ limit: 100, before: lastMessageId });
        messages2.push(...fetched.values());
        lastMessageId = fetched.lastKey();
        if (fetched.size < 100 || messages2.length >= limit) break;
      }
      if (limit < messages2.length) {
        const sliced = messages2.slice(0, limit);
        messages2.length = 0;
        messages2.push(...sliced);
      }
      return messages2;
    },
    byId(id: string) {
      return messages.get(id);
    },
    byContent() {
      return {
        equals(content: string, ignoreCase = false) {
          return ignoreCase
            ? messages.find((m: Message) => equalsIgnoreCase(m.content, content))
            : messages.find((m: Message) => m.content === content);
        },
        include(content: string, ignoreCase = false) {
          return ignoreCase
            ? messages.find((m: Message) => includesIgnoreCase(m.content, content))
            : messages.find((m: Message) => m.content.includes(content));
        },
      };
    },
    byFilter(filter: (message: Message) => boolean) {
      return messages.find(filter);
    },
  };
}

function getMessageURLInfo(url: string) {
  const match = url.match(/^https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)$/);
  if (!match) return {};
  const [, guildId, channelId, messageId] = match;
  return { guildId, channelId, messageId };
}

async function fetchMessageFromURL(gc: Client | Guild, url: string) {
  const { messageId, channelId } = getMessageURLInfo(url);
  if (!messageId) return null;
  const channel = await gc.channels.fetch(channelId!).catch(() => null);
  if (!channel || !('messages' in channel)) return null;
  return (channel as TextBasedChannel).messages.fetch(messageId).catch(() => null);
}

export { fetchMessageFromURL, findMessage, getMessageURLInfo };