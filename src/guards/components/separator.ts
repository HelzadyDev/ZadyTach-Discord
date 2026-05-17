import { SeparatorBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isSeparatorBuilder(value: unknown[]) {
  return value instanceof SeparatorBuilder || hasConstructor(value) && value.constructor.name === SeparatorBuilder.name;
}

export { isSeparatorBuilder };
