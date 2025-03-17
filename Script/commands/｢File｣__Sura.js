const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: "sura",
  version: "1.6",
  credits: "𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐲𝐛𝐞𝐫",
  hasPermssion:0,
  commandCategory: "sura",
  description:"playing sura",
  usages:"[command name]"
};

module.exports.run = async ({ api, event }) => {
  try {
    const data = JSON.parse(fs.readFileSync(__dirname + '/CYBER/Cyber.json', 'utf8'));

    let optionMessage = "Please select a Surah:\n";
    const keys = Object.keys(data);
    keys.forEach((key, index) => {
      optionMessage += `${index + 1}. ${key}\n`;
    });

    api.sendMessage(optionMessage, event.threadID, (error, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        data
      });
    }, event.messageID);
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { author, data } = handleReply;
  if (event.senderID != author) return;

  const choice = parseInt(event.body) - 1;
  const keys = Object.keys(data);

  if (choice >= 0 && choice < keys.length) {
    const selectedSurah = keys[choice];
    const selectedInfo = data[selectedSurah];
    const selectedUrl = selectedInfo.url;
    const title = selectedInfo.title;

    try {
      const audioData = (await axios.get(selectedUrl, { responseType: "arraybuffer" })).data;
      const path = __dirname + "/CYBER/Rajib.mp3";
      fs.writeFileSync(path, Buffer.from(audioData, "utf-8"));

      api.sendMessage({
        body: `sura ${selectedSurah} 🖤🎧 note: ${title}`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (e) {
      api.sendMessage(`Error: Unable to play ${selectedSurah}.`, event.threadID, event.messageID);
      console.log(e);
    }
  } else {
    api.sendMessage('Invalid choice. Please try again.', event.threadID, event.messageID);
  }
};
module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { author, data } = handleReply;
  if (event.senderID != author) return;

  const choice = parseInt(event.body) - 1;
  const keys = Object.keys(data);

  if (choice >= 0 && choice < keys.length) {
    const selectedSurah = keys[choice];
    const selectedInfo = data[selectedSurah];
    const selectedUrl = selectedInfo.url;
    const title = selectedInfo.title;

    try {
      const audioData = (await axios.get(selectedUrl, { responseType: "arraybuffer" })).data;
      const path = __dirname + "/CYBER/Rajib.mp3";
      fs.writeFileSync(path, Buffer.from(audioData, "utf-8"));

      api.sendMessage({
        body: `𝗦𝗨𝗥𝗔 ${selectedSurah} 🖤🎧\n\n ${title}`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (e) {
      api.sendMessage(`Error: Unable to play ${selectedSurah}.`, event.threadID, event.messageID);
      console.log(e);
    }
  } else {
    api.sendMessage('Invalid choice. Please try again.', event.threadID, event.messageID);
  }
};
