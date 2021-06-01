const express = require("express");
const crypto = require("crypto");
var path = require("path");
const app = express();

const calculate = async () => {
  const hash = crypto.createHash("sha256");
  async function calculateHash() {
    return async () => {
      return await hash.update(crypto.randomBytes(100).toString("hex"));
    };
  }
  for (let i = 0; i < 10e6; i++) {
    await calculateHash();
  }
  return hash.digest("hex") + "\n";
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/instructions.html"));
});

app.get("/health", (req, res) => {
  res.send("good");
});

app.get("/test", async (req, res) => {
  let data = await calculate();
  res.send(data);
});

app.listen(8080);
