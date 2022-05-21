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
      table.date('date').notNullable();
      table.string('status').notNullable();
      table
        .foreign('clientID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
    .createTable('applications', (table) => {
      table.increments('id').primary();
      table.string('status').notNullable();
      table
        .foreign('missionID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('missions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table
        .foreign('pilotID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
    .createTable('portfolio', (table) => {
      table.increments('id').primary();
      table.string('client').notNullable();
      table.date('dateCompleted').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('img').notNullable();
      table
        .foreign('pilotID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('portfolio')
    .dropTable('applications')
    .dropTable('missions')
    .dropTable('reviews')
    .dropTable('users');
};
