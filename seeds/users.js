const userData = require('../seeds_data/users');
const applicationsData = require('../seeds_data/applications');
const missionsData = require('../seeds_data/missions');
const portfolioData = require('../seeds_data/portfolio');
const reviewsData = require('../seeds_data/reviews');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    return knex("users").del() 
        .then(() => knex("users").insert(userData))
        .then(() => {
            return knex('reviews').del();
          })
        .then(() => {
            return knex('reviews').insert(reviewsData);
        })
        .then(() => {
            return knex('missions').del();
          })
        .then(() => {
            return knex('missions').insert(missionsData);
        })
        .then(() => {
            return knex('applications').del();
          })
        .then(() => {
            return knex('applications').insert(applicationsData);
        })
        .then(() => {
            return knex('portfolio').del();
          })
        .then(() => {
            return knex('portfolio').insert(portfolioData);
        })
};


