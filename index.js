const Discord = require('discord.js');
const figlet = require('figlet');
const ascii = require("./ascii")
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
let mess = ['Never', 'Disrespect', 'Billy'];
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
  console.log(r);
  return ascii.memes[r];
}

function chooseGif() {
  const r = getRandomInt(ascii.url.length);
  return ascii.url[r];
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
      console.log(`gifCount = ${gifCount}`)
      if (gifCount === 2) {
        gif = true;
      } 
    }
    
  }
});


client.login(token);