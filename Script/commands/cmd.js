module.exports.config = {
    name: "cmd",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "MAHBUB SHAON",
    description: "Manage/Control all bot modules",
    commandCategory: "System",
    usages: "[load/unload/loadAll/unloadAll/info] [name module]",
    cooldowns: 2,
    dependencies: {
        "fs-extra": "",
        "child_process": "",
        "path": ""
    }
};

const loadCommand = function ({ moduleList, threadID, messageID, api }) {
    if (!api || typeof api.sendMessage !== "function") {
        console.error("[ 𝗖𝗠𝗗 ] » API object is missing or invalid.");
        return;
    }

    if (!threadID || !messageID) {
        console.error("[ 𝗖𝗠𝗗 ] » Missing threadID or messageID.");
        return;
    }

    const { execSync } = require("child_process");
    const { writeFileSync, unlinkSync, readFileSync } = require("fs-extra");
    const { join } = require("path");
    const { configPath, mainPath } = global.client;
    const logger = require(mainPath + "/utils/log");

    let errorList = [];
    delete require.cache[require.resolve(configPath)];
    let configValue = require(configPath);

    writeFileSync(configPath + ".temp", JSON.stringify(configValue, null, 2), "utf8");

    for (const nameModule of moduleList) {
        try {
            const dirModule = __dirname + "/" + nameModule + ".js";
            delete require.cache[require.resolve(dirModule)];
            const command = require(dirModule);
            global.client.commands.delete(nameModule);

            if (!command.config || !command.run || !command.config.commandCategory) 
                throw new Error("[ 𝗖𝗠𝗗 ] - Module is not properly formatted!");

            global.client.eventRegistered = global.client.eventRegistered.filter(info => info !== command.config.name);

            global.client.commands.set(command.config.name, command);
            logger.loader(`Loaded command ${command.config.name}!`);
        } catch (error) {
            errorList.push(`- ${nameModule} reason: ${error}`);
        }
    }

    if (errorList.length > 0) {
        api.sendMessage(`[ 𝗖𝗠𝗗 ] » Some modules failed to load:\n${errorList.join("\n")}`, threadID, messageID);
    }

    api.sendMessage(`[ 𝗖𝗠𝗗 ] » Successfully loaded ${moduleList.length - errorList.length} commands!`, threadID, messageID);

    writeFileSync(configPath, JSON.stringify(configValue, null, 4), "utf8");
    unlinkSync(configPath + ".temp");
};

const unloadModule = function ({ moduleList, threadID, messageID, api }) {
    if (!api || typeof api.sendMessage !== "function") {
        console.error("[ 𝗖𝗠𝗗 ] » API object is missing or invalid.");
        return;
    }

    if (!threadID || !messageID) {
        console.error("[ 𝗖𝗠𝗗 ] » Missing threadID or messageID.");
        return;
    }

    const { writeFileSync, unlinkSync } = require("fs-extra");
    const { configPath, mainPath } = global.client;
    const logger = require(mainPath + "/utils/log").loader;

    delete require.cache[require.resolve(configPath)];
    let configValue = require(configPath);

    writeFileSync(configPath + ".temp", JSON.stringify(configValue, null, 4), "utf8");

    for (const nameModule of moduleList) {
        global.client.commands.delete(nameModule);
        global.client.eventRegistered = global.client.eventRegistered.filter(item => item !== nameModule);
        configValue["commandDisabled"].push(`${nameModule}.js`);
        global.config["commandDisabled"].push(`${nameModule}.js`);
        logger(`Unloaded command ${nameModule}!`);
    }

    writeFileSync(configPath, JSON.stringify(configValue, null, 4), "utf8");
    unlinkSync(configPath + ".temp");

    api.sendMessage(`[ 𝗖𝗠𝗗 ] » Successfully unloaded ${moduleList.length} command(s)!`, threadID, messageID);
};

module.exports.run = function ({ event, args, api }) {
    if (!api || typeof api.sendMessage !== "function") {
        console.error("[ 𝗖𝗠𝗗 ] » API object is missing or invalid.");
        return;
    }

    if (!event.threadID || !event.messageID) {
        console.error("[ 𝗖𝗠𝗗 ] » Missing threadID or messageID.");
        return;
    }

    if (event.senderID !== "100089047474463") {
        return api.sendMessage(`[ 𝗖𝗠𝗗 ] » You do not have permission to use this command.`, event.threadID, event.messageID);
    }

    const { readdirSync } = require("fs-extra");
    const { threadID, messageID } = event;

    let moduleList = args.slice(1);

    switch (args[0]) {
        case "load":
            if (moduleList.length === 0) {
                return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name cannot be blank!", threadID, messageID);
            }
            return loadCommand({ moduleList, threadID, messageID, api });

        case "unload":
            if (moduleList.length === 0) {
                return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name cannot be blank!", threadID, messageID);
            }
            return unloadModule({ moduleList, threadID, messageID, api });

        case "loadAll":
            moduleList = readdirSync(__dirname)
                .filter(file => file.endsWith(".js") && !file.includes("example"))
                .map(item => item.replace(/\.js/g, ""));
            return loadCommand({ moduleList, threadID, messageID, api });

        case "unloadAll":
            moduleList = readdirSync(__dirname)
                .filter(file => file.endsWith(".js") && !file.includes("example") && !file.includes("command"))
                .map(item => item.replace(/\.js/g, ""));
            return unloadModule({ moduleList, threadID, messageID, api });

        case "info":
            const command = global.client.commands.get(moduleList.join("") || "");

            if (!command) {
                return api.sendMessage("[ 𝗖𝗠𝗗 ] » The module you imported does not exist.", threadID, messageID);
            }

            const { name, version, hasPermssion, credits, cooldowns, dependencies } = command.config;
            return api.sendMessage(
                `====== ${name.toUpperCase()} ======\n` +
                `- Created by: ${credits}\n` +
                `- Version: ${version}\n` +
                `- Permission: ${(hasPermssion === 0) ? "User" : (hasPermssion === 1) ? "Admin" : "Support"}\n` +
                `- Cooldown: ${cooldowns} seconds\n` +
                `- Dependencies: ${(Object.keys(dependencies || {})).join(", ") || "None"}`,
                threadID, messageID
            );

        default:
            return api.sendMessage("[ 𝗖𝗠𝗗 ] » Invalid command!", threadID, messageID);
    }
};
