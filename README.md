# ZadyTach Discord

Utilitários para acelerar o desenvolvimento de bots com **discord.js**.

> Também reexporta funções de `@zadytach/core`.

## Instalação

```bash
npm install @zadytach/discord
```

## Componentes

Crie action rows com facilidade:

```ts
import { createRow } from "@zadytach/discord";

const row = createRow(
  new ButtonBuilder(/* ... */),
  new ButtonBuilder(/* ... */),
  new ButtonBuilder(/* ... */),
);

const selectRow = createRow(
  new StringSelectMenuBuilder(/* ... */),
);

interaction.reply({ components: [row, selectRow] });
```

Crie botões de link rapidamente:

```ts
import { createLinkButton, createRow } from "@zadytach/discord";

const row = createRow(
  createLinkButton({ label: "GitHub", url: "https://github.com/rinckodev" }),
  createLinkButton({ label: "YouTube", url: "https://youtube.com/@rinckodev" }),
);

interaction.reply({ components: [row] });
```

## Modais

Como cada row aceita apenas um input em modal, use `createModalInput` para criar o campo já encapsulado em uma row:

```ts
import { createModalInput } from "@zadytach/discord";

const modal = new ModalBuilder({
  customId: "my/modal",
  title: "My modal",
  components: [
    createModalInput({
      customId: "name",
      label: "Name",
      style: TextInputStyle.Short,
    }),
    createModalInput({
      customId: "age",
      label: "Age",
      style: TextInputStyle.Short,
    }),
  ],
});

interaction.showModal(modal);
```

Ou crie campos como objeto via `createModalFields`:

```ts
import { createModalFields } from "@zadytach/discord";

const modal = new ModalBuilder({
  customId: "my/modal",
  title: "My modal",
  components: createModalFields({
    name: {
      label: "Name",
      style: TextInputStyle.Short,
    },
    age: {
      label: "Age",
      style: TextInputStyle.Short,
    },
  }),
});
```

IDs customizados também funcionam:

```ts
createModalFields({
  ["my-custom-input-name"]: {
    label: "Name",
    style: TextInputStyle.Short,
  },
});
```

Converta os campos recebidos para objeto com `modalFieldsToRecord`:

```ts
import { modalFieldsToRecord } from "@zadytach/discord";

function run(interaction: ModalSubmitInteraction) {
  const fields = modalFieldsToRecord(interaction.fields);
  console.log(fields["my-custom-input-name"]);
  console.log(fields.age);
}
```

Com tipo genérico:

```ts
type FormFields = "id" | "nickname" | "bio";

function run(interaction: ModalSubmitInteraction) {
  const fields = modalFieldsToRecord<FormFields>(interaction.fields);
  console.log(fields.id);
  console.log(fields.nickname);
  console.log(fields.bio);
}
```

## Embeds

Crie embeds de forma simples:

```ts
const embed = createEmbed({
  title: "Welcome",
  description: "Hello world",
  color: "Random",
});
```

Defina thumbnail e imagem com URL, objeto ou attachment:

```ts
const embed = createEmbed({
  thumbnail: "https://github.com/rinckodev.png",
  image: guild.iconURL(),
});

const embedWithObject = createEmbed({
  image: { url: "imageurl", width: 400, height: 100 },
});

const attachment = new AttachmentBuilder(buffer, { name: "myimage.png" });
const embedWithAttachment = createEmbed({
  image: attachment,
});
```

## Channels

Extraia dados de URL de canal:

```ts
import { getChannelUrlInfo } from "@zadytach/discord";

const url = "https://discord.com/channels/537817462272557057/832829213651763210";
const { guildId, channelId } = getChannelUrlInfo(url);
```

Se a URL não for válida, retorna objeto vazio.

Encontre canais por id, nome, categoria ou filtro:

```ts
import { findChannel } from "@zadytach/discord";

const channel = findChannel(guild).byId("832829213651763210");
const general = findChannel(guild).byName("general");
const updates = findChannel(guild, ChannelType.GuildAnnouncement).byName("updates");

const ticket = findChannel(guild)
  .inCategoryName("Tickets")
  .byName(`ticket-${member.id}`);
```

## Roles

```ts
import { findRole } from "@zadytach/discord";

const memberRole = findRole(guild).byName("Member");
const adminRole = findRole(guild).byHexColor("#ff5454");
const leaderRole = findRole(guild).byId("537818031728885771");
```

## Members

```ts
import { findMember } from "@zadytach/discord";

const finder = findMember(guild);
const member = finder.byId("264620632644255745")
  ?? finder.byUsername("rincko")
  ?? finder.byGlobalName("Rincko")
  ?? finder.byNickname("RinckoZ_");
```

## Messages

Extraia dados de URL de mensagem:

```ts
import { getMessageUrlInfo } from "@zadytach/discord";

const url = "https://discord.com/channels/537817462272557057/1101949941712171078/1101950570035691530";
const { guildId, channelId, messageId } = getMessageUrlInfo(url);
```

## Commands

```ts
import { findCommand } from "@zadytach/discord";

const command = findCommand(client).byName("register");
```

## Emojis

```ts
import { findEmoji } from "@zadytach/discord";

const emoji = findEmoji(client).byName("discord");
```

## Regex

Extraia IDs de menções:

```ts
import { extractMentionId } from "@zadytach/discord";

extractMentionId("<@264620632644255745>");
extractMentionId("<#1068689068256403457>");
extractMentionId("<@&929925182796226632>");