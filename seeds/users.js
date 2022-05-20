const userData = require('../seeds_data/users');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    return knex("users").del() 
        .then(() => knex("users").insert(userData));
};


// const pilotData = require("../seed_data/pilot");
// const clientData = require("../seed_data/client");

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function (knex) {
//   return knex("pilot").del()
//     .then(function () {
//       return knex("pilot").insert(pilotData);
//     })
//     .then(() => {
//       return knex("client").del();
//     })
//     .then(() => {
//       return knex("client").insert(clientData);
//     });
// };