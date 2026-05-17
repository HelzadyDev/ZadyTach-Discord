import { ModalBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isModalBuilder(value: unknown[]) {
  return value instanceof ModalBuilder || hasConstructor(value) && value.constructor.name === ModalBuilder.name;
}

export { isModalBuilder };