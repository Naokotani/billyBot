const Discord = require('discord.js');
const figlet = require('figlet');
const ascii = require("./ascii")
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
let gifWork = ascii.url.slice(0);
let gif = false;
let gifCount = 0;
const back = "```"

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function asciiMessage(e) {
  let m = back
  m = m.concat(figlet.textSync(e, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
  }));
  m = m.concat(back);
  return m;
}

function chooseMess() {
  const r = getRandomInt(ascii.memes.length);
  return ascii.memes[r];
}

function chooseGif() {
  const r = getRandomInt(gifWork.length);
  const gifMess = gifWork[r];
  gifWork.splice(r, 1)
  if (gifWork.length === 0) {
    gifWork = ascii.url.slice(0);
    console.log(`Gifs rest to length ${gifWork.length}`)
  }
  return gifMess;
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${prefix}billy`) {
    if (gif === true){
          message.channel.send(chooseGif());
          gifCount = 0;
          gif = false;
    } else {
      mess = chooseMess();
      mess.forEach(e =>
      message.channel.send(asciiMessage(e))
      );
      gifCount ++;
      if (gifCount === 1) {
        gif = true;
      } 
    }
    
  }
});


client.login(token);