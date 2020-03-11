const { prefixs, servers } = require("../../data.js");

module.exports = {
  config: {
    name: "prefix",
    description: "Change the prefix for your server!",
    usage: "<prefix>",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["pre", "p"]
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner)
      return message.channel.send(
        "You dont have permission to use this command."
      );

    if (message.guild.id) {
      let before_prefix = prefixs[message.guild.id].serv_pre;
      prefixs[message.guild.id].serv_pre = args[0];
      message.channel.send(
        `Prefix changed from \'${before_prefix}\' to \' ${args[0]} \'`
      );
    }},
};