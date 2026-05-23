import { brBuilder } from '@zadytach/core';
import { EmbedBuilder, AttachmentBuilder, ColorResolvable, APIEmbed, APIEmbedField, Message, Embed } from 'discord.js';
import { chars } from '#constants';
import { createEmbedAsset, EmbedPlusFields, createEmbedFooter } from '#functions';

type EmbedAsset = string | { url: string };
type EmbedTimestamp = string | boolean | Date | number;

type EmbedPlusData = Omit<APIEmbed, 'fields'> & {
  mergeFields?: boolean;
  extends?: EmbedBuilder | Embed | APIEmbed;
  fields?: APIEmbedField[];
  color?: ColorResolvable;
  image?: EmbedAsset;
  thumbnail?: EmbedAsset;
  footer?: any;
  description?: string | string[];
  timestamp?: EmbedTimestamp;
  url?: string | URL;
};

type CreateEmbedOptions = EmbedPlusData & {
  array?: boolean;
  from?: Message | { message: Message } | { embeds: EmbedBuilder[] };
  fromIndex?: number;
};

class EmbedPlusBuilder extends EmbedBuilder {
  fields: EmbedPlusFields;

  constructor(data: EmbedPlusData) {
    const { mergeFields = false, extends: extendsEmbed, ...embedData } = data;
    const extendsEmbedData: Partial<APIEmbed> = extendsEmbed
      ? "data" in extendsEmbed ? extendsEmbed.data : extendsEmbed
      : {};
    const { fields: extendsFields, ...extendsData } = extendsEmbedData;
    const fields = (
      mergeFields
        ? [extendsFields ?? [], data.fields ?? []].flat()
        : data.fields ?? extendsFields ?? []
    ).map((field: APIEmbedField) => Object.assign(
      { name: field.name ?? chars.invisible, value: field.value ?? chars.invisible },
      field.inline !== undefined ? { inline: field.inline } : {}
    ));

    const builderData: Record<string, any> = Object.assign({}, extendsData, embedData, { fields });
    if (builderData.url) builderData.url = builderData.url.toString();

    const { color, footer, image, thumbnail, timestamp, description } = embedData;
    if (!footer) delete builderData.footer;
    if (footer) Object.assign(builderData, { footer: createEmbedFooter(footer) });
    if (image) Object.assign(builderData, { image: createEmbedAsset(image) });
    if (thumbnail) Object.assign(builderData, { thumbnail: createEmbedAsset(thumbnail) });
    if (description) builderData.description = brBuilder(description);

    const embed = new EmbedBuilder(builderData);
    if (timestamp) {
      embed.setTimestamp(
        typeof timestamp === "string" ? new Date(timestamp)
        : typeof timestamp === "boolean" ? new Date()
        : timestamp
      );
    }
    if (color) embed.setColor(color as ColorResolvable);

    super(embed.data);
    this.fields = new EmbedPlusFields(this);
  }

  update(data: Partial<EmbedPlusData>): this {
    const updated = createEmbed({ mergeFields: true, extends: this, ...data });
    Object.assign(this.data, (updated as EmbedPlusBuilder).data);
    return this;
  }

  has(property: keyof APIEmbed): boolean {
    return Boolean(this.data[property]);
  }

  toArray(): EmbedPlusBuilder[] {
    return Array.from([this]);
  }

  override toString(space = 2): string {
    return JSON.stringify(this, null, space);
  }

  toAttachment(data: { name: string } = { name: "embed.json" }, space = 2): AttachmentBuilder {
    const buffer = Buffer.from(this.toString(space), "utf-8");
    return new AttachmentBuilder(buffer, data);
  }

  override setColor(color: ColorResolvable | null): this {
    if (color === null) {
      super.setColor("#2B2D31");
    } else if (typeof color === "number") {
      this.update({ color });
    } else {
      super.setColor(color);
    }
    return this;
  }

  setAsset(asset: "image" | "thumbnail", source: EmbedAsset): this {
    this.update({ [asset]: source });
    return this;
  }

  setElementImageURL(element: "thumbnail" | "image" | "author" | "footer", url: string | null): this {
    switch (element) {
      case "thumbnail":
      case "image": {
        this.setAsset(element, url ?? "");
        break;
      }
      case "author": {
        const author = this.data.author;
        this.setAuthor({ name: author?.name ?? chars.invisible, iconURL: url ?? undefined });
        break;
      }
      case "footer": {
        const footer = this.data.footer;
        this.setFooter({ text: footer?.text ?? chars.invisible, iconURL: url ?? undefined });
        break;
      }
    }
    return this;
  }
}

function createEmbed(options: CreateEmbedOptions): EmbedPlusBuilder | EmbedPlusBuilder[] {
  const { array = false, from, fromIndex = 0, ...data } = options;
  const fromEmbeds = from
    ? "message" in from ? from.message.embeds
    : "embeds" in from ? from.embeds
    : []
    : [];

  return array
    ? from && fromEmbeds.length > 0
      ? fromEmbeds.map((embed) => new EmbedPlusBuilder({ extends: embed.toJSON() }))
      : [new EmbedPlusBuilder(data)]
    : from && fromEmbeds.length > 0
      ? new EmbedPlusBuilder({ extends: fromEmbeds[fromIndex].toJSON(), ...data })
      : new EmbedPlusBuilder(data);
}

export { EmbedPlusBuilder, createEmbed };