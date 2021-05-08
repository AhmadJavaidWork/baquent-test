if (process.env.NODE_ENV === 'production') {
  module.exports = {
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
    },
  };
} else {
  require('dotenv').config({
    path: `${process.env.PWD}/${process.env.NODE_ENV || 'development'}.env`,
  });

  module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: `${process.env.PWD}/db/migrations`,
        tableName: 'knex_migartion',
      },
      seeds: {
        directory: `${process.env.PWD}/db/seeds`,
      },
    },
  };
}
