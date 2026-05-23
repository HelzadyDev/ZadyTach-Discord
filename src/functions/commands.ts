import {
  ApplicationCommand,
  Client,
  Guild,
  chatInputApplicationCommandMention,
} from 'discord.js';

type CommandCollection = Client | Guild;

function findCommand(guildOrClient: CommandCollection) {
  const commands =
    guildOrClient instanceof Client
      ? guildOrClient.application!.commands.cache
      : guildOrClient.commands.cache;

  return {
    byName(name: string, and: (command: ApplicationCommand) => boolean = () => true) {
      return commands.find((command) => command.name === name && and(command));
    },
    byId(id: string) {
      return commands.get(id);
    },
    byFilter(filter: (command: ApplicationCommand) => boolean) {
      return commands.find(filter);
    },
  };
}

function commandMention(
  command: ApplicationCommand,
  a?: string,
  b?: string
) {
  if (a && b) {
    return chatInputApplicationCommandMention(command.name, a, b, command.id);
  }
  if (a) {
    return chatInputApplicationCommandMention(command.name, a, command.id);
  }
  return chatInputApplicationCommandMention(command.name, command.id);
}

export { commandMention, findCommand };