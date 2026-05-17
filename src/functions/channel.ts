import { ChannelType, Guild, GuildBasedChannel } from 'discord.js';

function findChannel(guild: Guild, type?: ChannelType) {
  const channelType = type ?? ChannelType.GuildText;
  const cache = guild.channels.cache;
  return {
    byId(id: string) {
      return cache.find(
        (c: GuildBasedChannel) => c.id === id && c.type === channelType
      );
    },
    byName(name: string, and: (c: GuildBasedChannel) => boolean = () => true) {
      return cache.find(
        (c: GuildBasedChannel) => 'name' in c && c.name === name && c.type === channelType && and(c)
      );
    },
    byFilter(filter: (c: GuildBasedChannel) => boolean) {
      return cache.find((c: GuildBasedChannel) => c.type === channelType && filter(c));
    },
    inCategoryId(id: string) {
      return {
        byId(id2: string) {
          return cache.find(
            (c: GuildBasedChannel) => c.id === id2 && c.type === channelType && 'parentId' in c && c.parentId === id
          );
        },
        byName(name: string, and: (c: GuildBasedChannel) => boolean = () => true) {
          return cache.find(
            (c: GuildBasedChannel) => 'name' in c && c.name === name && c.type === channelType && 'parentId' in c && c.parentId === id && and(c)
          );
        },
        byFilter(filter: (c: GuildBasedChannel) => boolean) {
          return cache.find(
            (c: GuildBasedChannel) => c.type === channelType && 'parent' in c && c.parent?.id === id && filter(c)
          );
        }
      };
    },
    inCategoryName(name: string) {
      return {
        byId(id: string) {
          return cache.find(
            (c: GuildBasedChannel) => c.id === id && c.type === channelType && 'parent' in c && c.parent?.name === name
          );
        },
        byName(name2: string, and: (c: GuildBasedChannel) => boolean = () => true) {
          return cache.find(
            (c: GuildBasedChannel) => 'name' in c && c.name === name2 && c.type === channelType && 'parent' in c && c.parent?.name === name && and(c)
          );
        },
        byFilter(filter: (c: GuildBasedChannel) => boolean) {
          return cache.find(
            (c: GuildBasedChannel) => c.type === channelType && 'parent' in c && c.parent?.name === name && filter(c)
          );
        }
      };
    }
  };
}

function getChannelUrlInfo(url: string) {
  const regex = /^https:\/\/discord\.com\/channels\/\d+\/\d+$/;
  if (!regex.test(url))
    return {};
  const [channelId, guildId] = url.split("/").reverse();
  return { channelId, guildId };
}

export { findChannel, getChannelUrlInfo };