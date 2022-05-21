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
    .createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('rating').notNullable();
      table.string('description').notNullable();
      table
        .foreign('recipientID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('authorID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
    .createTable('missions', (table) => {
      table.increments('id').primary();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table
        .foreign('clientID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('reviews').dropTable('users');
};
