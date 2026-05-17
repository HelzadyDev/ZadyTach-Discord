import { isDefined } from '@zadytach/core';
import { FileUploadBuilder } from 'discord.js';

function createFileUpload(arg: string | any, argB?: boolean | number, argC?: number, argD?: number) {
  if (typeof arg === "object") {
    return new FileUploadBuilder({
      custom_id: arg.customId,
      max_values: arg.maxValues,
      min_values: arg.minValues,
      required: arg.required,
      id: arg.id
    });
  }

  let required: boolean | undefined;
  let max_values: number | undefined;
  let min_values: number | undefined;

  if (typeof argB === "boolean") {
    required = argB;
    max_values = argC;
    min_values = argD;
  } else if (typeof argB === "number") {
    max_values = argB;
    min_values = argC;
  }

  const data: {
    custom_id: string;
    required?: boolean;
    max_values?: number;
    min_values?: number;
  } = { custom_id: arg };

  if (isDefined(required)) data.required = required;
  if (isDefined(max_values)) data.max_values = max_values;
  if (isDefined(min_values)) data.min_values = min_values;

  return new FileUploadBuilder(data);
}

export { createFileUpload };