import { chars } from '#constants';

function createEmbedFooter(options: string | { text?: string; iconURL?: string }): { text: string; iconURL?: string } | undefined {
  if (typeof options === "string") {
    return { text: options };
  }
  const { text, iconURL } = options;
  return !text && !iconURL ? void 0 : { text: text || chars.invisible, iconURL: iconURL || void 0 };
}

export { createEmbedFooter };
