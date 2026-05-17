import { TextInputStyle, TextInputBuilder, TextInputComponentData } from 'discord.js';
import { createRow } from '#functions';

function createTextInput(data: TextInputComponentData) {
  const { label: _, ...rest } = data;
  rest.style ??= TextInputStyle.Short;
  return new TextInputBuilder(rest as TextInputComponentData);
}

function createModalInput(data: TextInputComponentData) {
  data.style ??= TextInputStyle.Short;
  return createRow(new TextInputBuilder(data));
}

export { createModalInput, createTextInput };