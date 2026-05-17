import { Attachment, AttachmentBuilder } from 'discord.js';
import { hasConstructor } from '#guards';

function isAttachment(value: unknown[]) {
  return value instanceof Attachment || value instanceof AttachmentBuilder || hasConstructor(value) && [
    Attachment.name,
    AttachmentBuilder.name
  ].some(
    (name) => name === value.constructor.name
  );
}

export { isAttachment };

