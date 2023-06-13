import cors from 'cors';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import express from 'express';
import morgan from 'morgan';

import { executeInteraction, queryCommand } from '@/commands';
import { ROUTES } from '@/server/routes';
import { DISCORD_TOKEN, PORT } from '@/utils/constants';

type ClientWithCommands = Client & {
  commands?: Collection<string, unknown>;
};

export const createServer = () => {
  const client: ClientWithCommands = new Client({
    intents: [GatewayIntentBits.Guilds]
  });
  client.commands = new Collection();
  client.commands.set(queryCommand.name, queryCommand);

  client.once(Events.ClientReady, c => {
    console.log(`Discord bot ready! Logged in as ${c.user.tag}`);

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(morgan('tiny'));

    app.use('/', ROUTES);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = (interaction.client as ClientWithCommands).commands?.get(
      interaction.commandName
    );

    if (!command) {
      console.log(`Command ${interaction.commandName} not found`);
      return;
    }

    await interaction.deferReply();

    const prompt = interaction.options.get('prompt')?.value as string;

    if (!prompt) {
      await interaction.followUp({
        content: 'You must provide a prompt!'
      });
      return;
    }

    try {
      await executeInteraction(interaction, prompt);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: `
            Original query: ${prompt}\n\nThere was an error while generating a response!
          `
        });
      } else {
        await interaction.reply({
          content: `
            Original query: ${prompt}\n\nThere was an error while generating a response!
          `
        });
      }
    }
  });

  client.login(DISCORD_TOKEN);
};

createServer();
