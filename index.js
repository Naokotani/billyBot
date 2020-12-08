const Discord = require('discord.js');
const figlet = require('figlet');
const ascii = require("./ascii")
const axios = require('axios');
const { prefix, token, giphyKey } = require('./config.json');
const giphy = require('giphy-api')(giphyKey);
const client = new Discord.Client();
let gifWork = ascii.url.slice(0);
let platWork = ascii.plats.slice(0);
const back = "```"

function getFont(){
  const fonts = figlet.fontsSync();
  const r = getRandomInt(fonts.length);
  return fonts[r];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function asciiMessage(e) {
  const font = getFont();
  let m = back
  m = m.concat(figlet.textSync(e, {
      font: font,
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 40,
      whitespaceBreak: true
  }));
  m = m.concat(back);
  return m;
}

function chooseMess() {
  const r = getRandomInt(ascii.memes.length);
  return ascii.memes[r];
}

function ranArray (a) {
  const r = getRandomInt(a.length);
  const m = a[r];
  a.splice(r, 1);
  return m;
} 

function getMsgType () {
  const r = getRandomInt(2);
  console.log(r)
  if (r !== 1) {
    return true;
  }
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const search = args.join(' ');
  
  if (command === `billy`) {
    
    if (getMsgType() === true){
          message.channel.send(ranArray(gifWork));
          if (gifWork.length === 0) {
            gifWork = ascii.url.slice(0);
          }
    } else {
      mess = chooseMess();
      mess.forEach(e =>
      message.channel.send(asciiMessage(e))
      );
    } 
  }
  if (command === `plat`) {
    axios.get('http://inspirobot.me/api?generate=true')
      .then(response => {
        console.log(response.data);
        message.channel.send(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  if (command === `gif`) {
    try {
      giphy.random(search).then(function (res) {
        message.channel.send(res.data.url)
      });
    } catch(err) {
      console.log(err)
    }
  }
});

client.login(token);
