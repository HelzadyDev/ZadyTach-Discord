import { isDefined } from '@zadytach/core';
import { ComponentType, ModalBuilder } from 'discord.js';

function modalFieldsToRecord(data: any, parse: any = null) {
  const collection = "fields" in data ? "fields" in data.fields ? data.fields.fields : data.fields : data;
  const record = collection.reduce((acc: Record<string, unknown>, data2: any) => {
    if (data2.type === ComponentType.TextInput) {
      acc[data2.customId] = data2.value;
      return acc;
    }
    if (data2.type === ComponentType.FileUpload) {
      const attachments = data2.attachments;
      acc[data2.customId] = Array.from(attachments?.values() ?? []).map((data3: any) => data3.url);
      return acc;
    }
    if (data2.type === ComponentType.CheckboxGroup) {
      acc[data2.customId] = Array.from(data2.values);
      return acc;
    }
    if (data2.type === ComponentType.Checkbox) {
      acc[data2.customId] = data2.value;
      return acc;
    }
    if (data2.type === ComponentType.RadioGroup) {
      acc[data2.customId] = data2.value;
      return acc;
    }
    acc[data2.customId] = Array.from(data2.values ?? []);
    return acc;
  }, {});
  return parse ? parse(record) : record;
}

function createModalFields(...components: any[]) {
  return components.filter((v) => isDefined(v) && typeof v !== "boolean").map((data) => {
    if (typeof data === "string")
      return {
        type: ComponentType.TextDisplay,
        content: data
      };
    return data.data;
  });
}

function createModal(data: any, title: string, ...components: any[]) {
  if (typeof data === "string") {
    return new ModalBuilder({
      customId: data,
      title,
      components: createModalFields(...components)
    });
  }
  return new ModalBuilder({
    customId: data.title,
    title: data.title,
    components: createModalFields(...data.components ?? [])
  });
}

export { createModal, createModalFields, modalFieldsToRecord };