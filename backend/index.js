const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const SequelizeStore = require("connect-session-sequelize");

const UserRoute = require("./routes/UserRoute");
const ProductRoute = require("./routes/ProductRoute");
const AuthRoute = require("./routes/AuthRoute");

const db = require("./config/Database");

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api", UserRoute);
app.use("/api", ProductRoute);
app.use("/api", AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
