import { Guild, Role } from 'discord.js';

type RoleFilter = (role: Role) => boolean;

function findRole(guild: Guild) {
  return {
    byColor(color: number, and: RoleFilter = () => true) {
      return guild.roles.cache.find((role) => role.color === color && and(role));
    },
    byHexColor(hexColor: string, and: RoleFilter = () => true) {
      return guild.roles.cache.find((role) => role.hexColor === hexColor && and(role));
    },
    byName(name: string, and: RoleFilter = () => true) {
      return guild.roles.cache.find((role) => role.name === name && and(role));
    },
    byId(id: string) {
      return guild.roles.cache.get(id);
    },
    byFilter(filter: RoleFilter) {
      return guild.roles.cache.find(filter);
    }
  };
}

export { findRole };