import { ButtonBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isButtonBuilder(value: unknown[]) {
  return value instanceof ButtonBuilder || hasConstructor(value) && value.constructor.name === ButtonBuilder.name;
}

export { isButtonBuilder };
