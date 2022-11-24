const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const os = require("os");

const errorMiddleware = require("./src/middleware/error");
const userRouter = require("./src/routes/userRoutes");
const productRouter = require("./src/routes/productRoutes");
const orderRouter = require("./src/routes/orderRoutes");
const repairRouter = require("./src/routes/repairRoutes");
const utilRouter = require("./src/routes/utilsRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.json());

const corsOptions = {
  origin:["http://localhost:3000","https://cakeemon.vercel.app"],
  credentials: true,
  'Access-Control-Allow-Headers' : 'Origin X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  "Access-Control-Allow-Credentials": true,
  // "Access-Control-Allow-Origin":'*'
  
}
app.use(cookieParser());
app.use(
  cors(corsOptions)
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is started!",
  });
});

// routes
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", repairRouter);
app.use("/api", utilRouter);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
