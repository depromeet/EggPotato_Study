const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "/example.txt");
const input = fs.readFileSync(filePath).toString().split("\n");
