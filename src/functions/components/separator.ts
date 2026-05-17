import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

type separatorOptions = {large?: boolean, divider?: boolean};

function createSeparator(argA?: separatorOptions | boolean, argB?: boolean) {
  const [large, divider] =
    typeof argA === "object" ? [argA.large, argA.divider] : [argA, argB];
  return new SeparatorBuilder({
    divider,
    spacing: large ? SeparatorSpacingSize.Large : SeparatorSpacingSize.Small,
  });
};

export { createSeparator };
