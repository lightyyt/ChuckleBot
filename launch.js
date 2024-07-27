require("dotenv").config();
//Webhook
const down_emoji = process.env.EMOJI_DOWN
const {WebhookClient} = require("discord.js");
const wh_url = process.env.WEBHOOKINFO
const wh = new WebhookClient( { url: wh_url } );
const { spawn } = require('child_process');

function say(msg){
  wh.send({
	  content: msg,
  	username: 'Chuckple Infos',
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
        say("Chuckle went "+down_emoji)
        setTimeout(startScript, 3000); // Restart after 1 second
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
        say("An Error Ocurred starting Chuckle.")
    });
}


function startWs() {
    const child = spawn('node', ['ws.js'], {
        stdio: 'inherit'
    });
    
    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        // Optionally implement a delay before restart
        setTimeout(startWs, 3000); // Restart after 1 second
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
        say("An Error Ocurred starting Webserver.")
    });
}


startScript();
startWs();