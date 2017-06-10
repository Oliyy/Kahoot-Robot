const config = require("./config");
const Discordie = require('discordie');
const discordclient = new Discordie({
  autoReconnect: true
});
discordclient.connect({
  token: ""
});
var Kahoot = require('kahoot.js');
var kahootclient = new Kahoot;

discordclient.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + discordclient.User.username);
});

discordclient.Dispatcher.on("MESSAGE_CREATE", e => {
  if ((config.cmdPrefix != "" && e.message.content.substring(0, config.cmdPrefix.length) === config.cmdPrefix) || (e.message.content.substring(0, 2) == "<@" && e.message.content.substring(0, 22).replace(/\D/g, "") == discordclient.User.id) && e.message.author.id != discordclient.User.id && !e.message.author.bot) {
    if (config.cmdPrefix != "" && e.message.content.substring(0, config.cmdPrefix.length) === config.cmdPrefix) var command = e.message.content.substring(config.cmdPrefix.length).split(' ');
    else var command = e.message.content.substring(e.message.content.indexOf('>') + 2).split(' ');

    try {
      switch(command[0].toLowerCase()){
        case "init":
        var KahootID = command.splice(1).join('')

        kahootclient.join(KahootID, "test");
        kahootclient.on("joined", () => {
          e.message.channel.sendMessage("I joined the Kahoot!");
        });

        kahootclient.on("quizStart", quiz => {
          var quizname = quiz.name;
          e.message.channel.sendMessage("The quiz has started! The quiz's name is: " + quizname);

        });


        kahootclient.on("questionStart", question => {

          e.message.channel.sendMessage("A new question has started, answering the first answer.");

          question.answer(0);

        });
        kahootclient.on("quizEnd", () => {
          e.message.channel.sendMessage("The quiz has ended.");
        });
        break;

      }
    } catch (err) {
      console.log(err)
    }
  }
});
