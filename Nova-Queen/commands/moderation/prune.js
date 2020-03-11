module.exports = {
  config: {
    name: "prune",
    description: "Delete the message from any channel!",
    usage: "<number of messages>",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["purge", "delete"]
  },
  run: async (bot, message, args) => {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply(", that doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      return message.reply("you need to input a number between 1 and 99.");
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send(
        "there was an error trying to prune messages in this channel!"
      );
    });
  }
};