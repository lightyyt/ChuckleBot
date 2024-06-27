const _greet_hey = (msg) => {
  msg.reply(
    "Hey there, <@" +msg.author.id +
    ">! Im now running on Discord.js! :partying_face:"+
    "\nPlus I have a Github Repo now!",
  );
}
const _greet_possible = (msg) => {
  message.reply('I can tell you a joke. Just say: "chuckle tell me a joke" \nand at some point, we\'ll even be able to play games together, like tic tac toe! :smile:');
} 
module.exports = { _greet_hey };