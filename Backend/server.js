const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // This allows all domains to access your API



  
  // parse requests of content-type - application/json
app.use(express.json({ limit: "25mb" }));
  
  // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
  















require("./app/routes/student.routes")(app);
/*require("./app/routes/EmailRoutes")(app);*/

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

