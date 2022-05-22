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
        .integer('recipientID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('authorID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('timestamp');
    })
    .createTable('missions', (table) => {
      table.increments('id').primary();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('date').notNullable();
      table.string('status').notNullable();
      table
        .integer('clientID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('timestamp');
    })
    .createTable('applications', (table) => {
      table.increments('id').primary();
      table.string('status').notNullable().defaultTo('pending');
      table
        .integer('missionID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('missions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table
        .integer('pilotID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('timestamp');
    })
    .createTable('portfolio', (table) => {
      table.increments('id').primary();
      table.string('client').notNullable();
      table.string('dateCompleted').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('img').notNullable();
      table
        .integer('pilotID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('timestamp');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('portfolio')
    .dropTableIfExists('applications')
    .dropTableIfExists('missions')
    .dropTableIfExists('reviews')
    .dropTableIfExists('users');
};
