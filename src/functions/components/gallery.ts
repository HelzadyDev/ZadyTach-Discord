import { MediaGalleryBuilder, APIMediaGalleryItem, Attachment, AttachmentBuilder } from "discord.js";
import { isAttachment } from "#guards";
import { isDefined } from "@zadytach/core";

function createMediaGallery(...items: unknown[]) {
  return new MediaGalleryBuilder({
    items: items
      .flat()
      .filter((item) => typeof item !== "boolean")
      .filter(isDefined)
      .filter((item): item is string | Attachment | AttachmentBuilder | APIMediaGalleryItem =>
        typeof item === "string" ||
        item instanceof Attachment ||
        item instanceof AttachmentBuilder ||
        (typeof item === "object" && item !== null && "media" in item)
      )
      .map((item): APIMediaGalleryItem => {
        if (typeof item === "string") {
          return { media: { url: item } };
        }
        if (item instanceof Attachment || item instanceof AttachmentBuilder) {
          return { media: { url: `attachment://${item.name}` } };
        }
        return item as APIMediaGalleryItem;
      }),
  });
}

export { createMediaGallery };