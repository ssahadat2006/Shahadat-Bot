const axios = require('axios');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports.config = {
  name: "install",
  version: "1.0.1",
  hasPermission: 2, // 0 = সকলের জন্য, 1 = মডারেটর, 2 = এডমিন
  credits: "dipto (optimized by Mayaboti)",
  usePrefix: true,
  description: "Create a new JS file with code from a link or provided code, with syntax checking.",
  commandCategory: "utility",
  usages: "[file name] [link/code]",
  cooldowns: 5
};

module.exports.run = async ({ message, args, api, event }) => {
  try {
    const fileName = args[0];
    const input = args.slice(1).join(' ');

    if (!fileName || !input) {
      return api.sendMessage("⚠️ দয়া করে একটি বৈধ ফাইল নাম এবং কোড বা লিংক দিন!", event.threadID, event.messageID);
    }

    // File name validation
    if (fileName.includes("..") || path.isAbsolute(fileName)) {
      return api.sendMessage("❌ অবৈধ ফাইল নাম!", event.threadID, event.messageID);
    }

    // Allow only .js files
    if (!fileName.endsWith(".js")) {
      return api.sendMessage("⚠️ শুধুমাত্র .js ফাইল অনুমোদিত!", event.threadID, event.messageID);
    }

    let code;
    const linkPattern = /^(http|https):\/\/[^ "]+$/;

    if (linkPattern.test(input)) {
      if (!input.startsWith("https://trustedsource.com/")) { 
        return api.sendMessage("❌ অনুমোদিত উৎস ব্যতীত কোড ডাউনলোড করা যাবে না!", event.threadID, event.messageID);
      }
      const response = await axios.get(input);
      code = response.data;
    } else {
      code = input;
    }

    // Syntax checking
    try {
      new vm.Script(code);
    } catch (syntaxError) {
      return api.sendMessage(`❌ কোডে সিনট্যাক্স ত্রুটি: ${syntaxError.message}`, event.threadID, event.messageID);
    }

    const filePath = path.join(__dirname, fileName);

    // Prevent file overwrite
    if (fs.existsSync(filePath)) {
      return api.sendMessage("⚠️ এই নামে ইতিমধ্যে একটি ফাইল রয়েছে। অন্য নাম দিন!", event.threadID, event.messageID);
    }

    fs.writeFileSync(filePath, code, 'utf-8');
    api.sendMessage(`✅ সফলভাবে ফাইল তৈরি হয়েছে: ${filePath}`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("❌ ফাইল তৈরি করতে একটি সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
