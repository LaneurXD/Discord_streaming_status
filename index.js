const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Asia/Kolkata', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1123265602304352308')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/shaarpnesss') //Must be a youtube video link 
    .setState(`🟢 |〈 ${formatTime()} 〉`)
    .setName('Laneur | 24/7 | Seller 🥀')
    .setDetails(`Laneur | 24/7 | Seller 🥀`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('mp:attachments/1112763121916977192/1141741272558731408/20230801_135435.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('🇱🇦🇳🇪🇺🇷 🇴🇳 🇹🇴🇵 | 🇦🇱🇱 🇭🇦🇮🇱 🇱🇦🇳🇪🇺🇷 🌙') //Text when you hover the Large image
    .setAssetsSmallImage('mp:attachments/1138081476567642143/1138768092634284062/8285d845fbce5ede830d6291fec56b14.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Laneur') //Text when you hover the Small image

    .addButton('Discord', 'https://discord.gg/mnop');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newState = `🟢 |〈 ${formatTime()} 〉`;
      r.setState(newState);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);