import { TextDisplayBuilder } from 'discord.js';

function createTextDisplay(content: string, id?: number) {
  return new TextDisplayBuilder({
    content,
    ...(id !== undefined && { id })
  });
}

export { createTextDisplay };
