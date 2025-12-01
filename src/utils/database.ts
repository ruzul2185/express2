import { connect } from "mongoose";

const DatabaseConn = async () => {
  try {
    const uri = process.env.MONGO_URI || "";
    connect(uri);
    console.log("Database connection successful!");
  } catch (error) {
    console.log(error);
  }
};

export default DatabaseConn;
