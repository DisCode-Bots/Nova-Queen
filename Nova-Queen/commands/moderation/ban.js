const { RichEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");

module.exports = {
  config: {
    name: "ban",
    description: "Bans a user from the guild!",
    usage: "<@user> <reason>",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["b", "banish", "remove"]
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );

    let banMember =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banMember)
      return message.channel
        .send("Please provide a user to ban!")
        .then(m => m.delete(5000));

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "I dont have permission to perform this command"
      );

    banMember
      .send(
        `Hello, you have been banned from ${message.guild.name} for: ${reason}`
      )
      .then(() => message.guild.ban(banMember, { days: 1, reason: reason }))
      .catch(err => console.log(err));

    message.channel
      .send(`**${banMember.user.tag}** has been banned`)
      .then(m => m.delete(5000));

    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "Banned")
      .addField("Banned:", banMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find(c => c.name === "nq-logs");
    sChannel.send(embed);
  }
};
