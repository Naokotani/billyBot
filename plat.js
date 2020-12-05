const axios = require('axios');

const getUrl = async () => {
  const resp = await axios.get('http://inspirobot.me/api?generate=true') ;
  const url = await resp.data;
  return url
  
}

async function poop(){
 return await getUrl();   
}

console.log(getUrl())
console.log('second');