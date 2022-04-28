const MARIADB_CONFIG = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "productos",
  },
  pool: { min: 0, max: 7 },
};

module.exports = { options: MARIADB_CONFIG };
