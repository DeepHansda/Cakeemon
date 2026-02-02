const app = require("./app");
const PORT = process.env.PORT || 3400;
const connectDatabase = require("./src/DB/connection");
const dotenv = require("dotenv");
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "backend/src/config/configVars.env" });
//   }

dotenv.config();

// Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

// Connecting to database
connectDatabase();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
