import { ActionRowBuilder } from 'discord.js';
import { isAnySelectMenuBuilder } from '#guards';
import { isButtonBuilder } from '#guards';

function isActionRowBuilder(value: unknown, withComponent?: "selects" | "buttons") {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  const isActionRow =
    obj.constructor?.name === ActionRowBuilder.name &&
    Array.isArray(obj.components);
  if (isActionRow && withComponent) {
    const components = obj.components as unknown[];
    const guard = withComponent === "selects" ? isAnySelectMenuBuilder : isButtonBuilder;
    return components.some((c) => guard(c as any));
  }
  return isActionRow;
}

export { isActionRowBuilder };