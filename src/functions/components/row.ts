import { isDefined } from "@zadytach/core";
import { ActionRowBuilder } from "discord.js";

function createRow(...components: unknown[]) {
  const items = components
    .flat()
    .filter((c) => typeof c !== "boolean")
    .filter((c) => isDefined(c));

  return new ActionRowBuilder({
    // discord.js espera um array de componentes API; fazer cast aqui para satisfazer o TS
    components: items as any,
  });
}

export { createRow };
