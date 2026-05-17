import { TextInputBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isTextInputBuilder(value: unknown[]) {
  return value instanceof TextInputBuilder || hasConstructor(value) && value.constructor.name === TextInputBuilder.name;
}

export { isTextInputBuilder };