const { options } = require("./dbOptions");
const knex = require("knex")(options);

class Chat {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    return knex.from(this.tableName).select();
  }

  async getById(id) {
    try {
      const found = await knex.from(this.tableName).select("*").where("id", id);
      return found[0];
    } catch (error) {
      throw error;
    }
  }

  async addMessage(mail, message) {
    try {
      const date = new Date();
      const newMessage = { mail, message, date };
      const insertion = await knex(this.tableName).insert(newMessage);
      const insertedMessage = await this.getById(insertion[0]);
      return insertedMessage;
    } catch (error) {
      throw new Error(
        `Ha ocurrido un error agregando el contenido: ${error.description}`
      );
    }
  }

  /**
   * PRIVATE METHODS.
   */
}

module.exports = Chat;
