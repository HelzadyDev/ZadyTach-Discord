import { RadioGroupBuilder } from 'discord.js';

function createRadioGroup(data: {
  customId: string;
  options: any[];
}) {
  const builder = new RadioGroupBuilder();
  Object.assign(builder.data, {
    ...data,
    custom_id: data.customId
  });
  builder.setOptions(...data.options);
  return builder;
}

export { createRadioGroup };
