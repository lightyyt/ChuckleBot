//Now with github :)
const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  WebhookClient
} = require("discord.js");

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

function reboot(uid, m){
    if(uid==618031275961352203){
        doReboot();
    }else{
        m.reply("hmm.. no. i dont think so");
    }
}

bot.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  let filter = message.content.toLowerCase();
  let reg = filter.replace(/[^\w\s]/gm, "");
  switch (reg) {
    case "reboot plz":
        reboot(message.author.id, message);
        break;
    case "hey chuckle":
      message.reply(
        "Hey there, <@" +
          message.author.id +
          ">! Im now running on Discord.js! :partying_face:"+
          "\nPlus i have a Github Repo now too!",
      );
      break;
    case "chuckle what can you do":
      message.reply(
        'I can tell you a joke. Just say: "chuckle tell me a joke" \nand at some point, we\'ll even be able to play games together, like tic tac toe! :smile:',
      );
      break;
    case "chuckle tell me a joke":
      console.log("Telling a joke.");
      get_joke().then((joke) => {
        message.reply(joke[0]).then((msg) => {
          setTimeout(function () {
            msg.edit(joke[0] + "\n" + joke[1]);
          }, 2000);
        });
      });
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

async function get_joke(type = "") {
  try {
    const response = await fetch("https://joke.deno.dev/" + type);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const setup = data.setup;
    const punchline = data.punchline;
    return [setup, punchline];
  } catch (error) {
    console.error("Error fetching Joke:", error.message);
  }
}

bot.login(token);
