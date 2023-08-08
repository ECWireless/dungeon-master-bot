import { Client, Guild } from 'discord.js';

import { DISCORD_ALLOWED_TIME_WITHOUT_ANY_ROLES } from '@/utils/constants';
import { discordLogger } from '@/utils/logger';

export const lurkerGuard = async (client: Client, guild: Guild) => {
  const lurkerGuardCron = async () => {
    const membersFound = await guild.members.fetch();
    // let membersWithoutRole = membersFound.filter(
    //   (member) => member._roles.length < 1
    // );
    // console.log(membersWithoutRole.size);

    // guild.members.cache.filter((m) => {
    //   if (m._roles.length == 0) console.log(m);
    // });

    try {
      membersFound.forEach(member => {
        if (member.roles.cache.size === 0) {
          if (
            Number(member.joinedTimestamp) +
              Number(DISCORD_ALLOWED_TIME_WITHOUT_ANY_ROLES) <
            Date.now()
          ) {
            discordLogger(
              `Lurker with no roles found. Kicked <@${member.id}>.`,
              client
            );
            member.kick();
          }
        }
      });
    } catch (err) {
      discordLogger('Error caught in lurker guard', client);
    }
  };

  setInterval(lurkerGuardCron, Number(DISCORD_ALLOWED_TIME_WITHOUT_ANY_ROLES));
};
