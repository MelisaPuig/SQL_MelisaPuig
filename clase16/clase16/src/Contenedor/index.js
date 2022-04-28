const { options } = require("./dbOptions");
const knex = require("knex")(options);

class Contenedor {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async exists(id) {
    try {
      const foundEntry = await this.getById(id);
      return foundEntry !== null;
    } catch (error) {
      throw error;
    }
  }

  async save(title, price, thumbnail) {
    try {
      const newEntry = { title, price, thumbnail };
      const insertion = await knex(this.tableName).insert(newEntry);
      return this.getById(insertion[0]);
    } catch (error) {
      throw new Error(
        `Ha ocurrido un error agregando el contenido: ${error.description}`
      );
    }
  }

  async getById(id) {
    try {
      const foundRows = await knex
        .from(this.tableName)
        .select("*")
        .where("id", id);
      if (foundRows.length === 0) {
        return null;
      }
      return foundRows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return knex.from(this.tableName).select("*");
  }

  async update(id, title, price, thumbnail) {
    try {
      const update = { title, price, thumbnail };
      await knex.from(this.tableName).where("id", id).update(update);
      return this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    return knex.from(this.tableName).where("id", id).del();
  }

  async deleteAll() {
    return knex.from(this.tableName).del();
  }
}

module.exports = Contenedor;
