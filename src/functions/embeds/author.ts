import { Guild, GuildMember, User, ImageURLOptions } from 'discord.js';

type EmbedAuthorOptions = {
  prefix?: string;
  suffix?: string;
  url?: URL | string;
  iconURL?: string;
  extension?: ImageURLOptions['extension'];
  forceStatic?: boolean;
  size?: ImageURLOptions['size'];
  property?: string;
};

function createEmbedAuthor(type: User | GuildMember | Guild, options?: EmbedAuthorOptions) {
  const { prefix = "", suffix = "", url, iconURL: icon, extension, forceStatic, size = 1024 } = options ?? {};
  let name = "";
  let iconURL = icon;
  const imageOptions = { extension, forceStatic, size };

  switch (true) {
    case type instanceof User: {
      const { property = "displayName" } = options ?? {};
      const user = type as User;
      name = (user as any)[property] ?? user.displayName;
      iconURL = user.displayAvatarURL(imageOptions);
      break;
    }
    case type instanceof GuildMember: {
      const { property = "displayName" } = options ?? {};
      const member = type as GuildMember;
      name = (property === "username" || property === "globalName"
        ? (member.user as any)[property]
        : (member as any)[property]) ?? member.displayName;
      iconURL = member.displayAvatarURL(imageOptions);
      break;
    }
    case type instanceof Guild: {
      const { property = "name" } = options ?? {};
      const guild = type as Guild;
      name = (guild as any)[property];
      iconURL = guild.iconURL(imageOptions) ?? undefined;
      break;
    }
  }

  return { name: `${prefix}${name}${suffix}`, url: url?.toString(), iconURL };
}

export { createEmbedAuthor };