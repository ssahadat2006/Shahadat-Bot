module.exports.config = {
  name: "restart",
  version: "7.0.0",
  hasPermission: 2,
  credits:"𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐲𝐛𝐞𝐫",
  description: "restart bot system",
  commandCategory: "admin",
  usages: "restart",
  cooldowns: 5,
  dependencies: {
    "process": ""
  }
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {
  const process = require("process");
  const { threadID, messageID } = event;
  api.sendMessage(`restar ${global.config.BOTNAME} ｢⏳｣ ,`, threadID, ()=> process.exit(1));
}
