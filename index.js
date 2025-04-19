const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ intents: '3276799', disableMentions: 'everyone' });

const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

const VOICE_CHANNEL_ID = '1353309199953563708'; // Ensure this is correct

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID)
            .catch(err => console.error('Failed to fetch channel:', err));

        console.log('Fetched channel:', channel);

        if (!channel || channel.type !== 'GUILD_VOICE') {  // Fix: Compare against 'GUILD_VOICE' instead of 2
            console.log('Voice channel not found or invalid (wrong type)');
            return;
        }

        const connection = joinVoiceChannel({
            channelId: VOICE_CHANNEL_ID,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfMute: true,
            selfDeaf: false, 
        });

        console.log('Joined voice channel and self-muted');
    } catch (error) {
        console.error('Error joining voice channel:', error);
    }
});
client.login('');
