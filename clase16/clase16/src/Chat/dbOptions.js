const path = require("path");

const FILE_LOCATION = path.join(__dirname, "DB", "ecommerce");

const SQLITE_CONFIG = {
  client: "sqlite",
  connection: {
    filename: FILE_LOCATION,
  },
  pool: { min: 0, max: 7 },
};

module.exports = { options: SQLITE_CONFIG };
