import { isAttachment } from '#guards';

function createEmbedAsset(source: string | any, options = {}) {
  if (isAttachment(source)) {
    return { url: `attachment://${source.name}`, ...options };
  }
  if (source && typeof source === "object" && "url" in source) {
    return { ...source, ...options };
  }
  return source ? { url: source, ...options } : void 0;
}

export { createEmbedAsset };
