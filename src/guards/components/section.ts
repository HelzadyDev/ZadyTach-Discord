import { SectionBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isSectionBuilder(value: unknown[]) {
  return value instanceof SectionBuilder || hasConstructor(value) && value.constructor.name === SectionBuilder.name;
}

export { isSectionBuilder };