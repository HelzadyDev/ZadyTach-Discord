import { FileBuilder, Attachment, AttachmentBuilder } from 'discord.js';
import { isAttachment } from '#guards';

type FileOptions = {
  spoiler?: boolean;
  name?: string;
  description?: string;
};

function createFile(source: string | Attachment | AttachmentBuilder, options: FileOptions = {}) {
  const prefix = "attachment://";
  const url = isAttachment(source as any) ? `${prefix}${(source as Attachment).name}` : source as string;
  return new FileBuilder({
    spoiler: options.spoiler,
    file: { ...options, url }
  });
}

export { createFile };