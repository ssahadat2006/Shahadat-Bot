module.exports.config = {
  name: "random",
  version: "11.9.7",
  permssion: 0,
  credits: "Islamick Cyber Chat",
  prefix:true,
  description: "random love story video",
  category: "video",
  usages: "random",
  cooldowns: 30,
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
  const video = apis.data.api
  var shaon = [`${video}/video/status`,
`${video}/video/sad`,
`${video}/video/baby`,
`${video}/video/love`,
`${video}/video/ff`,
`${video}/video/shairi`,
`${video}/video/humaiyun`,
`${video}/video/islam`,
`${video}/video/anime`,
`${video}/video/short`,
`${video}/video/event`,
`${video}/video/prefix`,
`${video}/video/cpl`,
`${video}/video/time`,
`${video}/video/lofi`,
`${video}/video/happy`
]
  var shaon1 = shaon[Math.floor(Math.random() * shaon.length)]
  axios.get(shaon1).then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let shaon2 = res.data.shaon;
  let callback = function () {
          api.sendMessage({
            body: `𝐒𝐏𝐀𝐘𝐒𝐇𝐄𝐀𝐋 𝐑𝐀𝐍𝐃𝐎𝐌 𝐌𝐈𝐗 
${shaon2} 𝚃𝙾𝚃𝙰𝙻 𝚅𝙸𝙳𝙴𝙾:${count}...🎬\n\n｢𝐑𝘈𝘑𝘈 卝 চৌধুরী｣`,
            attachment: fs.createReadStream(__dirname + `/cache/Shaoon.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/Shaoon.mp4`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/Shaoon.mp4`)).on("close", callback);
      })
}
