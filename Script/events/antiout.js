module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Shahadat Islam",  // Credits    
 description: "Listen events Notify bot or group member with random gif/photo/video"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(` : Oops! An error occurred while re-adding ${name}.\nOwner: Shahadat Islam\nPlease try again later.`, event.threadID);
   } else {
    api.sendMessage(` : ${name} left the group! \nReason: ${type}\nOwner: Shahadat Islam\nBot is here to assist!`, event.threadID);
   }
  });
 } else {
   api.sendMessage(` : ${name} has been removed by the administrator.\nOwner: Shahadat Islam\nWe hope to see them back soon!`, event.threadID);
 }
};
