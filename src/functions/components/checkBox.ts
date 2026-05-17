import { CheckboxBuilder, CheckboxGroupBuilder } from "discord.js";

type CheckboxData = {
  customId?: string;
  [key: string]: unknown;
};

function createCheckbox(a: string | CheckboxData, b: boolean, c: string) {
  const builder = new CheckboxBuilder();
  if (typeof a === "string") {
    Object.assign(builder.data, {
      custom_id: a,
      default: b,
      id: c,
    });
    return builder;
  }
  Object.assign(builder.data, {
    ...a,
    custom_id: a.customId,
  });
  return builder;
}
function createCheckboxGroup(data: {
  customId: string;
  options: any[];
  maxValues?: number;
  minValues?: number;
}) {
  const builder = new CheckboxGroupBuilder();
  Object.assign(builder.data, {
    ...data,
    custom_id: data.customId,
    max_values: data.maxValues,
    min_values: data.minValues,
  });
  builder.setOptions(...data.options);
  return builder;
}

export { createCheckbox, createCheckboxGroup };
