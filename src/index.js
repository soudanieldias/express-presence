const { Client, Intents, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');

const app = new express();
const port = 3000;

let userStatus = 'online';
const userId = '';
const token = '';

app.get('/status', (req, res) => {
  res.status(200).json({
    status: userStatus,
  });
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

const client = new Client({ intents: [
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
]});


client.on('presenceUpdate', (oldPresence, newPresence) => {
  const { user } = newPresence;
  if (newPresence.userId == userId) {
    userStatus = newPresence.status;
    return;
  }
  return;
});


client.login(token).catch((error) => {
  console.error('Erro ao logar o bot:', error);
});
