//Variablen
const Discord = require("discord.js");
require("dotenv").config();

const TOKEN = "OTgzNjQ3NzkyNzcxNzkyOTE2.GfWMKQ.hDPSJni-Se7dnSiMPGaDo2xQzsyGm_3ub_Jg3Y";
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
})

//Event Listener
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.login(process.env.TOKEN);

client.on("messageCreate", (message) => {
  if(message.content =="hi"){
    message.reply("Hello World!")
  }
})