//Variablen
const Discord = require("discord.js");
require("dotenv").config();
const TOKEN = "OTgzNjQ3NzkyNzcxNzkyOTE2.GfWMKQ.hDPSJni-Se7dnSiMPGaDo2xQzsyGm_3ub_Jg3Y";
const welcomeChannelId = "983669381311660032";
const generateImage = require("./generateImage");

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
  ]
})

//Event Listener
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on("messageCreate", (message) => {
  if(message.content =="hi"){
    message.reply("Hello World!")
  }
})

//test für member affiliated zeug
/*
client.on("guildMemberUpdate", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}>! Welcome to the server!`,
    files: [img]
  })
})
*/

client.on("guildMemberAdd", async (member) => {
const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}>! Welcome to the server!`,
    files: [img]
  })
})

client.login(process.env.TOKEN);