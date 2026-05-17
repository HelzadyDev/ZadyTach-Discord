import { MediaGalleryBuilder, MediaGalleryItemBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isMediaGalleryBuilder(value: unknown[]) {
  return value instanceof MediaGalleryBuilder || hasConstructor(value) && value.constructor.name === MediaGalleryBuilder.name;
}
function isMediaGalleryItemBuilder(value: unknown[]) {
  return value instanceof MediaGalleryItemBuilder || hasConstructor(value) && value.constructor.name === MediaGalleryItemBuilder.name;
}

export { isMediaGalleryBuilder, isMediaGalleryItemBuilder };