module.exports = {
 config:{
 name: "auto",
 version: "0.0.2",
 hasPermssion: 0,
 credits: "Nazrul",
 description: "auto video download",
 commandCategory: "user",
 usages: "",
 cooldowns: 5,
},
run: async function({ api, event, args }) {},
handleEvent: async function ({ api, event, args }) {
 const axios = require("axios")
 const request = require("request")
 const fs = require("fs-extra")
 const content = event.body ? event.body : '';
 const body = content.toLowerCase();
 const {alldown} = require("nayan-videos-downloader")
 if (body.startsWith("https://")) {
 api.setMessageReaction("💔", event.messageID, (err) => {}, true);
const data = await alldown(content);
 console.log(data)
 const {low, high, title} = data.data;
 api.setMessageReaction("💯", event.messageID, (err) => {}, true);
 const video = (await axios.get(high, {
 responseType: "arraybuffer",
 })).data;
 fs.writeFileSync(__dirname + "/cache/auto.mp4", Buffer.from(video, "utf-8"))

 return api.sendMessage({
 body: `Title:- ${title}`,
 attachment: fs.createReadStream(__dirname + "/cache/auto.mp4")

 }, event.threadID, event.messageID);
 }
}
}
