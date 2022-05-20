/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('profile').nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
