function run(msg){
  if(msg.author.id==618031275961352203) {
    msg.replay("Okay Boss!");
    doReboot();
  } else {
    msg.reply("hmm.. no. i dont think so");
  }
}