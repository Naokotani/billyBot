const Discord = require('discord.js');
const client = new Discord.Client();
const figlet = require('figlet');
const ascii = require("./ascii")
const axios = require('axios');
const { prefix, token, giphyKey, tenorKey} = require('./config.json');
const giphy = require('giphy-api')(giphyKey);
const Tenor = require("tenorjs").client({
    "Key": tenorKey, // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
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
  if (command === 'tenor') {
    if (args[0] > 0) {
      if (args[0] > 3) {
        args[0] = 3;
      }
      const s = args.slice(1).join(' ');
      console.log(`sliced args = ${s}`)
      console.log(`search number = ${args[0]}`)
      Tenor.Search.Random(s, args[0]).then(Results => {
        Results.forEach(Post => {
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
            message.channel.send(Post.url)
          });
        }).catch(console.error);
    } else {
      console.log(search)
      Tenor.Search.Random(search, 1).then(Results => {
        Results.forEach(Post => {
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
            message.channel.send(Post.url)
          });
        }).catch(console.error);
    }
  }
});

client.login(token);
