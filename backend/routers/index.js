const userRouter = require("./user.router");
const majorRouter = require("./major.router");
const periodRouter = require("./period.router");
const topicRouter = require("./topic.router");
const authRouter = require("./auth.router");
const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/major", majorRouter);
  app.use("/api/period", periodRouter);
  app.use("/api/topic", topicRouter);
  app.use("", authRouter);
  app.use(errorHandle);
};
