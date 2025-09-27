import mongoose from "mongoose";
import VAR from "../config/constants.ts";

export default async (databaseURI: string) => {
  try {
    const connect = await mongoose.connect(databaseURI);
    console.log(`---- MONGODB CONNECTED (${connect.connection.host}) ----`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log(`> connected ${VAR.DB_URI! + VAR.DATABASE_NAME}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("> disconnected");
});
