import { Client, Guild, GuildEmoji } from 'discord.js';

type GuildOrClient = Client | Guild;

function findEmoji(guildOrClient: GuildOrClient) {
  const emojis = guildOrClient.emojis.cache;
  return {
    byName(name: string, animated?: boolean, and: (emoji: GuildEmoji) => boolean = () => true) {
      return animated !== undefined
        ? emojis.find((emoji) => emoji.name === name && emoji.animated === animated && and(emoji))
        : emojis.find((emoji) => emoji.name === name && and(emoji));
    },
    byId(id: string, animated?: boolean) {
      return animated !== undefined
        ? emojis.find((emoji) => emoji.id === id && emoji.animated === animated)
        : emojis.find((emoji) => emoji.id === id);
    },
    byFilter(filter: (emoji: GuildEmoji) => boolean) {
      return emojis.find(filter);
    },
  };
}

export { findEmoji };