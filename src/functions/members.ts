import { Guild, GuildMember } from 'discord.js';

function findMember(guild: Guild) {
  const cache = guild.members.cache;
  return {
    byGlobalName(globalName: string, and: (member: GuildMember) => boolean = () => true) {
      return cache.find((member) => member.user.globalName === globalName && and(member));
    },
    byNickname(nickname: string, and: (member: GuildMember) => boolean = () => true) {
      return cache.find((member) => member.nickname === nickname && and(member));
    },
    byUsername(username: string, and: (member: GuildMember) => boolean = () => true) {
      return cache.find((member) => member.user.username === username && and(member));
    },
    byDisplayName(displayName: string, and: (member: GuildMember) => boolean = () => true) {
      return cache.find((member) => member.displayName === displayName && and(member));
    },
    byId(id: string) {
      return cache.get(id);
    },
    byFilter(filter: (member: GuildMember) => boolean) {
      return cache.find(filter);
    },
  };
}

export { findMember };