const userData = require('../seeds_data/users');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    return knex("users").del() 
        .then(() => knex("users").insert(userData));
};


