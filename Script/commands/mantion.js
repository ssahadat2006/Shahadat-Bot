module.exports.config = {
  name: "goiadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100000654976375","100086680386976","100082395531611","100002603691602") {
    var aid = ["100000654976375","100086680386976","100082395531611","100002603691602"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["আমার বস উল্লাস কে এতো ডাকো কেন😒, ভালো টালো বাসো নাকি🤭", "আমর বস উল্লাস কে আর একবার মেনশন দিলে তোমার নাকের মধ্যে ঘুষি মারমু😡", " বস উল্লাস  কাজে ব্যস্ত আছে যা বলার আমাকে বলো🫣", "বস উল্লাস কে এত মেনশন না দিয়ে পারলে একটা একটা গার্লফ্রেন্ড দে","উল্লাস বসকে মেনশন দিস,বস এই মুহূর্তে তোর নানির সাথে রুম ডেট করতে ।"বস উল্লাস কে একবার মেনশন দিলে তোমারে থাবরাইয়া মুতের কালার চেঞ্জ কইরা ফালামু 🤭🙈🤖","বস উল্লাস কই থুমি থুমারে এক বলদে ডাকে😁🤣"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
