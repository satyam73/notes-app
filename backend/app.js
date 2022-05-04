require('dotenv').config()
const express = require("express");
const app = express();
const router = require("./routers/routers")
require("../db/conn")
const port = process.env.PORT || 5001;
const path = require("path");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views")
const auth = require("../db/middleware/auth");
const cookieParser = require('cookie-parser');

// middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)
app.use(express.static(staticPath))

// setting view engine, partials and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// for not found pages - 404 error page
app.use(function (req, res) {
   res.status(404).render('404error', {
      errorMsg: "Oops! Page Not Found"
   });
});

// listening to the server
app.listen(port, (err) => {
   if (err) console.log(err);
   console.log(`server is listening to port ${port}`);
})