import { isDefined } from '@zadytach/core';

function hasConstructor(value: unknown[]) {
  return typeof value === "object" && isDefined(value) && "constructor" in value && typeof value.constructor?.name === "string";
}

export { hasConstructor };