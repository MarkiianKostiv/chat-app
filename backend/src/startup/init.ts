import { Express } from "express";
import mongooseConnect from "../db/mongodb/mongodb";
import { server } from "../socket/socket";
import { sendRandomMessage } from "../utils/sendRandomMessage";
import { constants } from "../constants/constants";

const appSetup = async (app: Express) => {
  try {
    await Promise.all([mongooseConnect()]);
    const APP_PORT = Number(process.env.APP_PORT) || 3000;

    server.listen(APP_PORT, () => {
      console.log(`Server started on port ${APP_PORT}`);
    });

    setInterval(async () => {
      await sendRandomMessage();
    }, constants.oneHour);
  } catch (error: unknown) {
    console.log("Unable to start the app!");
    console.error(error);
  }
};

export default appSetup;
