require("dotenv").config();
//Webhook
const {WebhookClient} = require("discord.js");
const wh_url = process.env.WEBHOOKINFO
const wh = new WebhookClient( { url: wh_url } );
const { spawn } = require('child_process');

function say(msg){
  wh.send({
	  content: msg,
  	username: 'Chuckple Beta Infos',
  	avatarURL: 'https://cdn-icons-png.freepik.com/512/984/984440.png',
  });
}

function startScript() {
    const child = spawn('node', ['index.js'], {
        stdio: 'inherit'
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        // Optionally implement a delay before restart
        say("Chuckle went :bot_down:")
        setTimeout(startScript, 1000); // Restart after 1 second
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
        say("An Error Ocurred starting Chuckle.")
    });
}

startScript();