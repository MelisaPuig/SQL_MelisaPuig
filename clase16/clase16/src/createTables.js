const MARIADB_OPTIONS = require("./Contenedor/dbOptions");
const SQLITE_OPTIONS = require("./Chat/dbOptions");
const knexContenedor = require("knex")(MARIADB_OPTIONS.options);
const knexChat = require("knex")(SQLITE_OPTIONS.options);

const TABLE_PRODUCTOS = "productos";
const TABLE_CHAT = "mensajes";

const FIRST_PRODUCTS = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
];

async function createContenedorTable() {
  try {
    await knexContenedor.schema.createTable(TABLE_PRODUCTOS, (table) => {
      table.increments("id");
      table.string("title");
      table.float("price").unsigned();
      table.string("thumbnail");
    });
    await knexContenedor(TABLE_PRODUCTOS).insert(FIRST_PRODUCTS);
    await knexContenedor.destroy();
    console.log(`Tabla ${TABLE_PRODUCTOS} creada.`);
  } catch (error) {
    throw error;
  }
}

async function createChatTable() {
  try {
    await knexChat.schema.createTable(TABLE_CHAT, (table) => {
      table.increments("id");
      table.string("mail");
      table.string("message");
      table.time("date");
    });
    await knexChat.destroy();
    console.log(`Tabla ${TABLE_CHAT} creada.`);
  } catch (error) {
    throw error;
  }
}

createContenedorTable();
createChatTable();
