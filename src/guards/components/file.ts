import { FileBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isFileBuilder(value: unknown[]) {
  return value instanceof FileBuilder || hasConstructor(value) && value.constructor.name === FileBuilder.name;
}

export { isFileBuilder };