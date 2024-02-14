// env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./Config/database");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const ChatRoutes = require("./Routes/ChatRoutes");
// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// DB Connection
connectToDb();

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/chats", ChatRoutes);

app.listen(process.env.PORT, () => {
  console.log("App listened on port ", process.env.PORT);
});
