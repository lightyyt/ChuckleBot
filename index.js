//Now with github :)
const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  WebhookClient
} = require("discord.js");

/* Commands */
const _reboot = require("./actions/reboot.js");
const { _greet_hey, _greet_possible } = require("./actions/greet.js");
const _joke = require("./actions/joke.js");
/*   Util   */
const { filter_text, filter_msg } = require("./util/filter.js");
/*----------*/

require("dotenv").config();
//Webhook
const wh_url = process.env.WEBHOOK
const wh = new WebhookClient( { url: wh_url } );
wh.send({
	content: 'Chuckple Beta is Restarting!',
	username: 'Chuckple Server Updates',
	avatarURL: 'https://cdn-icons-png.freepik.com/512/984/984440.png',
});

//Bot
const token = process.env.TOKEN
var rematch_user = null;
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

bot.on("ready", () => {
  console.log("Chuckle is online!");
});
function doReboot(){
   process.exit();

}


bot.on("messageCreate", (message) => {
  if (message.author.bot) { return; }
  try{
    switch ( filter_msg(message) ) {
      case "reboot plz":
        _reboot(message);
        break;
      case 'error plz':
        if(message.author.id==618031275961352203){
          throw new Error("This is a debugging-error thrown by @<618031275961352203>!");
        }
        break;
      case "hey chuckle":
        _greet_hey(message);
        break;
      case "chuckle what can you do":
        _greet_possible(message);
        break;
      case "chuckle tell me a joke":
        _joke(message);
        break;
      case "chuckle lets play rock paper scissors":
        r_p_s(message);
        break;
      case "chuckle i want a rematch":
        rematch_rps(message);
        break;
      case "rematch chuckle":
        rematch_rps(message);
        break;
      case "chuckle lets play again":
        rematch_rps(message);
    }
  } catch (ex) {
    let errch = bot.channels.cache.get(1079858413841940480);
    errch.send(ex);
  }
});

function rematch_rps(message){
  console.log("checking rematch");
  if(message.author.id == rematch_user){
      r_p_s(message);
  }else{
     message.reply("You werent the last person I played against!");
  }
}
//Rock Paper Scissors code
bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  //Remove Buttons

  const choices = ["rock", "paper", "scissors"];
  const uc = interaction.customId;
  const chs = uc.split("_");
  const realId = chs[0];
  const userChoice = chs[1];
  if(realId != interaction.user.id)
  {
     await interaction.reply({ content: 'You arent the Player!', ephemeral: true });
     return;
  }
  //interaction.message.edit({ components: [] });
  //Get Random Choice
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;
  if (userChoice === botChoice) {
    result = "It's a tie! We both chose " + upper(botChoice);
  } else if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "paper" && botChoice === "rock") ||
    (userChoice === "scissors" && botChoice === "paper")
  ) {
    result = "You win! " + upper(userChoice) + " beats " + upper(botChoice);
  } else {
    result = "You lose! " + upper(botChoice) + " beats " + upper(userChoice);
  }

  await interaction.message.edit({
      content: result,
      components: []
      });
  rematch_user = interaction.user.id;
});
function upper(str){
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//const fetch = require("node-fetch");
async function r_p_s(msg) {
  //Select 📄, ✂️, or 🪨
  const rock = new ButtonBuilder()
    .setCustomId(msg.author.id+"_rock")
    .setLabel("🪨")
    .setStyle(ButtonStyle.Primary);
  const paper = new ButtonBuilder()
    .setCustomId(msg.author.id+"_paper")
    .setLabel("📄")
    .setStyle(ButtonStyle.Primary);
  const scissors = new ButtonBuilder()
    .setCustomId(msg.author.id+"_scissors")
    .setLabel("✂️")
    .setStyle(ButtonStyle.Primary);
  const row = new ActionRowBuilder().addComponents(rock, paper, scissors);
  msg.reply({
    content: "Okay, please select one!",
    components: [row],
  });
}



bot.login(token);
