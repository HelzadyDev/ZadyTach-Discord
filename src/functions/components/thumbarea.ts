import { createSection, createTextDisplay } from '#functions';

function createThumbArea(argA: string | any, argB: any) {
  const data = typeof argA === "string" ? { content: argA, thumbnail: argB } : argA;
  return data.thumbnail ? createSection(data.content, data.thumbnail) : createTextDisplay(data.content);
}

export { createThumbArea };
