const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

const client = new Client({ intents: 3276799, disableMentions: 'everyone' });

// List of voice channel IDs you want to join
const VOICE_CHANNEL_IDS = [
  '',
  '',
  // add more channel IDs as needed
];

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  for (const channelId of VOICE_CHANNEL_IDS) {
    try {
      const channel = await client.channels.fetch(channelId);

      if (!channel || channel.type !== 'GUILD_VOICE') {
        console.log(`Voice channel not found or invalid type for ID: ${channelId}`);
        continue;
      }

      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: false,
      });

      console.log(`Joined voice channel: ${channel.name} (${channel.id})`);
    } catch (error) {
      console.error(`Failed to join voice channel ${channelId}:`, error);
    }
  }
});

client.login('');
