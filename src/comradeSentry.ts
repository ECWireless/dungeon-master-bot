import {
  Client,
  // Collection,
  Events,
  GatewayIntentBits,
  Partials,
  TextChannel
} from 'discord.js';

import { lurkerGuard } from '@/features/lurkerGuard';
import { roleClaim } from '@/features/roleClaim';
// import fs from 'fs'@
import {
  DISCORD_ALLOW_BOTS,
  DISCORD_GUARD_TOKEN,
  DISCORD_GUILD_ID,
  DISCORD_NEWCOMERS_CHANNEL_ID,
  DISCORD_UNLOCK_CHANNELS_ID
} from '@/utils/constants';
import { discordLogger } from '@/utils/logger';

export const createComradeSentryServer = () => {
  // initialize discord client
  const client = new Client({
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildInvites
    ]
  });

  // creating commands reader
  // client.commands = new Collection();
  // const commandFiles = fs
  //   .readdirSync('./commands')
  //   .filter(file => file.endsWith('.js'));
  // commandFiles.forEach(file => {
  //   const command = require(`./commands/${file}`);
  //   client.commands.set(command.data.name, command);
  // });

  client.on(Events.ClientReady, () => {
    if (!client.user) return;
    console.log(`RaidGuild Guard logged in as ${client.user.tag}`);

    roleClaim(client);

    const guild = client.guilds.resolve(DISCORD_GUILD_ID);
    if (!guild) return;

    lurkerGuard(client, guild);
  });

  client.on(Events.GuildMemberAdd, member => {
    try {
      const newComersChannel = member.guild.channels.cache.get(
        DISCORD_NEWCOMERS_CHANNEL_ID
      ) as TextChannel | undefined;
      if (!newComersChannel) return;

      if (member.user.bot && DISCORD_ALLOW_BOTS === 'false') {
        discordLogger(`Kicked unauthorized bot, <@${member.id}>`, client);
        member.kick();
        return;
      }

      if (member.user.bot && DISCORD_ALLOW_BOTS === 'true') {
        discordLogger(`Bot <@${member.id}> has entered the tavern`, client);
        return;
      }

      newComersChannel.send({
        content: `Welcome, <@${member.id}>! Please verify yourself at <#${DISCORD_UNLOCK_CHANNELS_ID}> if you don't have access to our public channels.`
      });
    } catch (err) {
      console.log(err);
      discordLogger('Error caught in entry check.', client);
    }
  });

  client.login(DISCORD_GUARD_TOKEN);
};
