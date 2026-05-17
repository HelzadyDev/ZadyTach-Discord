import { TextDisplayBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isTextDisplayBuilder(value: unknown[]) {
  return value instanceof TextDisplayBuilder || hasConstructor(value) && value.constructor.name === TextDisplayBuilder.name;
}

export { isTextDisplayBuilder };