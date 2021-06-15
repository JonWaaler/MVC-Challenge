// Includes
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const favicon = require("express-favicon");

// Controllers
const routes = require("./controllers/routes");

// Express static serve
const path = require("path");

// Authentication bcrypt
// const { auth } = require("express-openid-connect");
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Express init
const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));

// Serve favicon
app.use(favicon(__dirname + "/favicon.ico"));
// app.use(auth(config));

// Sets handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // css, js

// serve controller routes
app.use(routes); // Database routes

// Open server
sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App hosted on: http://localhost:${PORT}/`)
  );
});
