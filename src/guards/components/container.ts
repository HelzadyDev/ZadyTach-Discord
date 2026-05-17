import { ContainerBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isContainerBuilder(value: unknown[]) {
  return value instanceof ContainerBuilder || hasConstructor(value) && value.constructor.name === ContainerBuilder.name;
}

export { isContainerBuilder };