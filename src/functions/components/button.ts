import {
  ButtonBuilder,
  ButtonStyle,
  APIMessageComponentEmoji,
  BaseMessageOptions,
} from 'discord.js';
import { createRow } from '#functions';

interface LinkButtonData {
  url: string;
  label?: string;
  emoji?: APIMessageComponentEmoji;
}

function createLinkButton(
  data: string | LinkButtonData,
  label?: string,
  emoji?: APIMessageComponentEmoji
): ButtonBuilder {
  if (typeof data === 'string') {
    label ??= data;
    return new ButtonBuilder({
      style: ButtonStyle.Link,
      label,
      url: data,
      emoji,
    });
  }
  data.label ??= data.url;
  return new ButtonBuilder({ style: ButtonStyle.Link, ...data });
}

function wrapButtons(maxItemsPerRow: number, ...buttons: (ButtonBuilder | ButtonBuilder[])[]) {
  const items = buttons.flat();
  const result: ReturnType<typeof createRow>[] = [];
  for (let index = 0; index < items.length; index += maxItemsPerRow) {
    result.push(createRow(items.slice(index, index + maxItemsPerRow)));
  }
  return result;
}

export { createLinkButton, wrapButtons };