import { hexToRgb } from "@zadytach/core";
import {
  AutocompleteInteraction,
  EmbedBuilder,
  EmbedData,
  Guild,
  Interaction,
  User,
} from "discord.js";
import { createEmbedAuthor } from "#functions";
import { getConfig } from "#settings";

type AnyInteraction = Exclude<Interaction, AutocompleteInteraction>;

interface ReplyOptions {
  interaction: AnyInteraction;
  text: string;
  ephemeral?: boolean;
  update?: boolean;
  clear?: boolean;
  content?: string;
}

interface EmbedReplyOptions extends Omit<ReplyOptions, "text"> {
  text?: string;
  color: string;
  embed?: EmbedData;
}

export function embedReply({
  interaction,
  text,
  ephemeral = true,
  update = false,
  color,
  embed: data,
  clear,
  content,
}: EmbedReplyOptions): void {
  const embed = new EmbedBuilder({
    color: hexToRgb(color),
    description: text,
    ...data,
  });

  const components = clear ? [] : undefined;

  if (update) {
    if (interaction.isMessageComponent()) {
      interaction.update({ content, embeds: [embed], components });
      return;
    }
    interaction.editReply({ content, embeds: [embed], components });
    return;
  }

  interaction.reply({ ephemeral, embeds: [embed], content });
}

export const reply = {
  success({ interaction, ...options }: ReplyOptions) {
    embedReply({ color: getConfig().colors.success, clear: true, interaction, ...options });
  },
  danger({ interaction, ...options }: ReplyOptions) {
    embedReply({ color: getConfig().colors.danger, clear: true, interaction, ...options });
  },
  primary({ interaction, ...options }: ReplyOptions) {
    embedReply({ color: getConfig().colors.primary, clear: true, interaction, ...options });
  },
  server({ interaction, guild, ...options }: ReplyOptions & { guild: Guild }) {
    embedReply({
      color: getConfig().colors.primary,
      clear: true,
      interaction,
      embed: {
        footer: {
          text: guild.name,
          iconURL: guild.iconURL() ?? undefined,
        },
      },
      ...options,
    });
  },
  user({ interaction, user, ...options }: ReplyOptions & { user: User }) {
    embedReply({
      color: getConfig().colors.primary,
      clear: true,
      interaction,
      embed: { author: createEmbedAuthor(user) },
      ...options,
    });
  },
};