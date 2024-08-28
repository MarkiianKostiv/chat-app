// script to create bots (can be executed once)
import UserModel from "../db/mongodb/schema/user.schema";
import bcrypt from "bcrypt";

const createBots = async () => {
  const bots = [
    {
      username: "quoteBot1",
      firstName: "Quote",
      lastName: "Bot1",
      email: "quote1@bot.com",
      password: "BotPassword1",
    },
    {
      username: "quoteBot2",
      firstName: "Quote",
      lastName: "Bot2",
      email: "quote2@bot.com",
      password: "BotPassword2",
    },
    {
      username: "quoteBot3",
      firstName: "Quote",
      lastName: "Bot3",
      email: "quote3@bot.com",
      password: "BotPassword3",
    },
  ];

  for (const bot of bots) {
    const existingBot = await UserModel.findOne({ username: bot.username });
    if (!existingBot) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(bot.password, salt);
      const newBot = new UserModel({
        username: bot.username,
        firstName: bot.firstName,
        lastName: bot.lastName,
        email: bot.email,
        password: hashedPassword,
      });
      await newBot.save();
      console.log(`${bot.username} created`);
    } else {
      console.log(`${bot.username} already exists`);
    }
  }
};

export default createBots;
