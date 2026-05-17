function extractMentionId(mention: string): string | null {
  const regex = new RegExp(/\d+/);
  const matches = mention.match(regex);
  return matches ? matches[0] : null;
}

export { extractMentionId };