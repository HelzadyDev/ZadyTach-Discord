import { EmbedBuilder, APIEmbedField } from 'discord.js';
import { chars } from '#constants';

type FieldPredicate = ((field: APIEmbedField, index: number, array: APIEmbedField[]) => boolean) | string | number;
type PartialField = Partial<APIEmbedField>;

class EmbedPlusFields {
  private embed: EmbedBuilder;

  constructor(embed: EmbedBuilder) {
    this.embed = embed;
  }

  set fields(fields: APIEmbedField[]) {
    this.embed.setFields(fields);
  }

  get fields(): APIEmbedField[] {
    return this.embed.data.fields ?? [];
  }

  [Symbol.iterator]() {
    let pointer = 0;
    const fields = this.fields;
    return {
      next() {
        return {
          done: pointer >= fields.length,
          value: fields[pointer++] ?? null
        };
      }
    };
  }

  get length(): number {
    return this.fields.length;
  }

  get record(): Record<string, string> {
    return this.fields.reduce(
      (record: Record<string, string>, { name, value }: APIEmbedField) =>
        Object.assign(record, { [name]: value }),
      {}
    );
  }

  get(query: number | string): APIEmbedField | undefined {
    if (typeof query === "number") return this.fields[query];
    return this.fields.find((f: APIEmbedField) => f.name === query);
  }

  find(predicate: (field: APIEmbedField, index: number, array: APIEmbedField[]) => boolean): APIEmbedField | undefined {
    return this.fields.find(predicate);
  }

  push(...fields: PartialField[]): this {
    this.embed.addFields(fields.map(this.fieldFormat));
    return this;
  }

  set(...fields: PartialField[]): this {
    this.embed.setFields(fields.map(this.fieldFormat));
    return this;
  }

  insert(index: number, ...fields: PartialField[]): void {
    this.fields.splice(index, 0, ...fields.map(this.fieldFormat));
  }

  map<T>(callback: (field: APIEmbedField, index: number, array: APIEmbedField[]) => T): T[] {
    return this.toArray().map(callback);
  }

  update(predicate: FieldPredicate, field: PartialField): boolean {
    const index = this.getPredicateIndex(predicate);
    if (index === -1) return false;
    const embedField = this.get(index);
    if (!embedField) return false;
    this.embed.spliceFields(index, 1, Object.assign(embedField, field));
    return true;
  }

  delete(predicate: FieldPredicate): boolean {
    const index = this.getPredicateIndex(predicate);
    if (index === -1) return false;
    const embedField = this.get(index);
    if (!embedField) return false;
    this.embed.spliceFields(index, 1);
    return true;
  }

  clear(): this {
    this.fields = [];
    return this;
  }

  toArray(): APIEmbedField[] {
    return Array.from(this);
  }

  getPredicateIndex(predicate: FieldPredicate): number {
    switch (typeof predicate) {
      case "function":
        return this.fields.findIndex(predicate);
      case "string":
        return this.fields.findIndex((f: APIEmbedField) => f.name === predicate);
      case "number":
        return predicate;
      default:
        return -1;
    }
  }

  fieldFormat(field: PartialField): APIEmbedField {
    return Object.assign(
      { name: field.name ?? chars.invisible, value: field.value ?? chars.invisible },
      field.inline !== undefined ? { inline: field.inline } : {}
    );
  }
}

export { EmbedPlusFields };