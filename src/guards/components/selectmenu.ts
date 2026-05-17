import { StringSelectMenuBuilder, UserSelectMenuBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isStringSelectMenuBuilder(value: unknown[]) {
  return value instanceof StringSelectMenuBuilder || hasConstructor(value) && value.constructor.name === StringSelectMenuBuilder.name;
}
function isUserSelectMenuBuilder(value: unknown[]) {
  return value instanceof UserSelectMenuBuilder || hasConstructor(value) && value.constructor.name === UserSelectMenuBuilder.name;
}
function isRoleSelectMenuBuilder(value: unknown[]) {
  return value instanceof RoleSelectMenuBuilder || hasConstructor(value) && value.constructor.name === RoleSelectMenuBuilder.name;
}
function isChannelSelectMenuBuilder(value: unknown[]) {
  return value instanceof ChannelSelectMenuBuilder || hasConstructor(value) && value.constructor.name === ChannelSelectMenuBuilder.name;
}
function isMentionableSelectMenuBuilder(value: unknown[]) {
  return value instanceof MentionableSelectMenuBuilder || hasConstructor(value) && value.constructor.name === MentionableSelectMenuBuilder.name;
}
function isAnySelectMenuBuilder(value: unknown[]) {
  return isStringSelectMenuBuilder(value) || isUserSelectMenuBuilder(value) || isRoleSelectMenuBuilder(value) || isChannelSelectMenuBuilder(value) || isMentionableSelectMenuBuilder(value);
}

export { isAnySelectMenuBuilder, isChannelSelectMenuBuilder, isMentionableSelectMenuBuilder, isRoleSelectMenuBuilder, isStringSelectMenuBuilder, isUserSelectMenuBuilder };
