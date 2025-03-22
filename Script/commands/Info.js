const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Ullash",
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : 𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐚𝐥𝐞
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝐒𝐢𝐧𝐠𝐥𝐞
┃ 🎂 𝐀𝐠𝐞       : 𝟏𝟖
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐬𝐥𝐚𝐦
┃ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝐇𝐒𝐂 (𝟐𝟎𝟐𝟔)
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝐌𝐚𝐡𝐚𝐥𝐜𝐡𝐚𝐫𝐢, 𝐊𝐡𝐚𝐠𝐫𝐚𝐜𝐡𝐡𝐚𝐫𝐢, 𝐂𝐡𝐢𝐭𝐭𝐚𝐠𝐨𝐧𝐠, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : [𝐂𝐥𝐢𝐜𝐤 𝐇𝐞𝐫𝐞(https://www.tiktok.com/@shahadat_bhai100k)
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : [𝐂𝐥𝐢𝐜𝐤 𝐇𝐞𝐫𝐞(https://www.facebook.com/2025sahadat2025)
┃ ▶️ 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 : [𝐂𝐥𝐢𝐜𝐤 𝐇𝐞𝐫𝐞(https://youtube.com/@shahadat-bai?)
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞: ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));
  
    return request("https://i.imgur.com/7Wbb76O.jpeg")
        .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
        .on('close', () => callback());
};