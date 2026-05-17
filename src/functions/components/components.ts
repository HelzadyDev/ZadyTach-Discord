import { isDefined } from '@zadytach/core';
import { isAttachment, isButtonBuilder, isAnySelectMenuBuilder } from '#guards';
import { createMediaGallery, createRow, createTextDisplay } from '#functions';

function createComponents(...data: unknown[]) {
  return data.flat().filter((value) => isDefined(value) && typeof value !== "boolean").map((component) => {
    if (typeof component === "string") {
      return createTextDisplay(component);
    }
    if (isAnySelectMenuBuilder(component as any)) {
      return createRow(component as any);
    }
    if (isButtonBuilder(component as any)) {
      return createRow(component as any);
    }
    if (isAttachment(component as any)) {
      return createMediaGallery(component as any);
    }
    return component;
  });
}

export { createComponents };