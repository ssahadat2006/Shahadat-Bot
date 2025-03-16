module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Mirai Team & Shahadat Islam",
	description: "Notify About Members Removed Or That Have Left The Group.",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const botName = "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭";
	const ownerName = "Shahadat Islam"; 

	const leaveMessages = [
		`${botName} বলছে: আহারে! 😾 ${ownerName} কি জানে যে তুই চলে গেছিস? 😹`,
		`${botName} বলছে: 😾 ${ownerName} এর পারমিশন ছাড়া গ্রুপ ছাড়া যাবে না! আবার আয়! 🤭`,
		`😹 ${name} হালার পো! একাই বেরিয়ে গেলো! ${botName} বস কিছু বলতে পারেন না? 😾`,
		`😾 ${name} আমাদের ছেড়ে চলে গেলো... কিন্তু কোথায় যাবে? ${ownerName} দেখছে! 👀`,
		`🔥 ${name}, এইভাবে চলে গেলে তো ${botName} কষ্ট পাবে! 😿`,
		`😹 ${name} গেল... কিন্তু ${ownerName} জানে সব! কোথায় পালাবি? 😏`,
		`😾 ${name}, এইভাবে পালিয়ে গেলে তো ${botName} কষ্ট পাবে! 😿`
	];

	const kickMessages = [
		`${botName} বলছে: 😾 ${ownerName} এর পারমিশন ছাড়া বের হওয়া নিষেধ! তাই কিক খাইলি! 😿🥵`,
		`😹 ${name} বেশি চালাক ছিলো! ${ownerName} ঠিকই ধরে ফেলে দিলো! 😈`,
		`🔥 ${name}, চলে যেতে চেয়েছিল, কিন্তু ${botName} অনুমতি দেয়নি! তাই কিক! 😼`,
		`🤣 ${name} কে কিক দেয়া হলো! ${ownerName} বলে দিয়েছে, দুষ্টু লোক গ্রুপে থাকবে না! 😹`,
		`😿 ${name}, এইভাবে কিক খেলে কষ্ট লাগে না? ${botName} কিন্তু কান্না করছে! 😭`
	];

	const type = (event.author == event.logMessageData.leftParticipantFbId) 
		? leaveMessages[Math.floor(Math.random() * leaveMessages.length)]
		: kickMessages[Math.floor(Math.random() * kickMessages.length)];

	const path = join(__dirname, "cache", "leavegif");
	const gifPath = join(path, `leave.gif`);

	if (!existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") 
		? msg = `~ পালাইছে রে পালাইছে🤣. \n{name}\nReason: {type}.\n\n🔹 Bot: ${botName}\n🔹 Owner: ${ownerName}` 
		: msg = data.customLeave;

	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	let formPush;
	if (existsSync(gifPath)) {
		formPush = { body: msg, attachment: createReadStream(gifPath) };
	} else {
		formPush = { body: msg };
	}

	return api.sendMessage(formPush, threadID);
};
