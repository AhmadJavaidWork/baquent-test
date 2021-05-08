import knex from 'knex';
import config from './knexConfig';

const environmentConfig = config[process.env.NODE_ENV];
const connection = knex(environmentConfig);

module.exports = connection;
