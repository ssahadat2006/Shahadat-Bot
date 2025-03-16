module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.3",
    credits: "Shahadat Islam (Customized)",
    description: "Welcome new members with style! 🎉",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "joinGif");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    const botName = "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭";
    const ownerName = "Shahadat Islam";
    

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[${global.config.PREFIX}] ${botName}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", threadID, () => api.sendMessage(
            {
                body: `🤖 আসসালামু আলাইকুম!   
${botName} **Connected! ✅**  
বট সফলভাবে গ্রুপে যুক্ত হয়েছে! 😈  

🔹 যেকোনো কমান্ড দেখতে **${global.config.PREFIX}help** ব্যবহার করুন।  
🔹 সাহায্যের জন্য **${ownerName}** কে নক করতে পারেন।  
👉 FB link: [Click Here](https://www.facebook.com/profile.php?id=100089047474463)  
`,
                attachment: fs.createReadStream(__dirname + "/cache/joinmp4/bot_welcome.mp4")
            },
            threadID
        ));
    }


    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);

            let mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);


            const welcomeMessages = [
                `🌺 আসসালামু আলাইকুম, {name}!  
🏡 স্বাগতম আমাদের গ্রুপ **{threadName}** এ!  
✨ তুমি আমাদের {soThanhVien} তম সদস্য! আশা করি ভালো থাকবে! 🚀  
📜 **গ্রুপ রুলস:**  
1️⃣ স্প্যামিং/অপমানজনক কথা নয়  
2️⃣ সকলের প্রতি শ্রদ্ধাশীল হও  
3️⃣ মজা করো, তবে সীমার মধ্যে!`,

                `😻 Hey {name}!  
🎉 **Welcome to {threadName}!**  
✨ গ্রুপের মজা নষ্ট কোরো না! Enjoy your stay! 🤗  
🚀 **তুমি এখন আমাদের {soThanhVien} তম সদস্য!**`,

                `🔥 {name},  
🎊 **Welcome to {threadName}!**  
💬 কিছু জানতে চাইলে আমার মালিক **${ownerName}** কে জিজ্ঞেস করতে পারো! 🚀`,

                `😈 কে এলো! {name},  
👀 সাবধানে থেকো, এই গ্রুপের লোকজন কিন্তু খুবই চালাক! 🤭`,

                `🤖 {name},  
🙌 **Welcome to our community!**  
🎉 **তুমি এখন আমাদের {soThanhVien} তম সদস্য!** 🚀`
            ];


            const msg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName);

            if (existsSync(path)) mkdirSync(path, { recursive: true });

    
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

            let formPush;
            if (existsSync(pathGif)) {
                formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
            } 
            else if (randomPath.length !== 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions };
            } 
            else {
                formPush = { body: msg, mentions };
            }

            return api.sendMessage(formPush, threadID);
        } catch (e) { 
            return console.log(e);
        }
    }
};
