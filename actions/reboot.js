const _reboot = (msg) => {
  if(msg.author.id==618031275961352203) {
    msg.reply("Okay Boss!");
    doReboot();
  } else {
    msg.reply("hmm.. no. i dont think so");
  }
}

const doReboot = () => {
   process.exit();

}

module.exports = { _reboot, doReboot };