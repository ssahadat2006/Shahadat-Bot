module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "ryuko",
  prefix: true,
  description: "guide",
  category: "system",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;

  function out(data, gifUrl = null) {
    if (gifUrl) {
      api.sendMessage({ body: data, attachment: gifUrl }, threadID, messageID);
    } else {
      api.sendMessage(data, threadID, messageID);
    }
  }

  var arr = ["mpre", "mprefix", "prefix", "command mark", "What is the prefix of the bot?", "PREFIX"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() || body === i || str === body) {
      const prefix = global.data.threadData.get(parseInt(threadID))?.PREFIX || global.config.PREFIX;
      const gifUrl = "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif"; // এখানে তোমার GIF লিংক বসাও

      return out(`Bot prefix : ${global.config.PREFIX}`, gifUrl);
    }
  });
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("no prefix commands", event.threadID);
};
