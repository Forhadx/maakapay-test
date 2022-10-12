const express = require("express");
const cors = require("cors");

const payRoutes = require("./payRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/", payRoutes);

app.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
