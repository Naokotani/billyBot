const Discord = require('discord.js');
const figlet = require('figlet');
const ascii = require("./ascii")
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
let gifWork = ascii.url.slice(0);
let platWork = ascii.plats.slice(0);
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
  }
  return gifMess;
}

function ranArray (a) {
  const r = getRandomInt(a.length);
  const m = a[r];
  a.splice(r, 1);
  return m;
} 

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${prefix}billy`) {
    if (gif === true){
          message.channel.send(ranArray(gifWork));
          if (gifWork.length === 0) {
            gifWork = ascii.url.slice(0);
          }
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
  if (message.content === `${prefix}plat`) {
    message.channel.send(ranArray(platWork));
    if (platWork.length === 0) {
      platWork = ascii.plats.slice(0);
    }
  }
});


client.login(token);