const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const Nova = new Client();

["aliases", "commands"].forEach(x => (Nova[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(Nova));

Nova.login(token);
