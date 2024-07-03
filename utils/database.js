import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery" , true);

  if (isConnected) {
    console.log("DB already connected.");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: "promptopia_db",
      }
    )

    isConnected = true;
    console.log("DB connected");
  } catch (e) {
    console.log("DB Error: " + e);
  }

}

export { isConnected };