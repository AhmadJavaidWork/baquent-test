exports.up = async (knex) => {
  await knex.schema.createTable('raw', async (table) => {
    table.increments('id').primary();
    table.string('fsym', 10).notNullable();
    table.string('tsym', 10).notNullable();
    table.unique(['fsym', 'tsym']);
    table.specificType('CHANGE24HOUR', 'double precision');
    table.specificType('CHANGEPCT24HOUR', 'double precision');
    table.specificType('OPEN24HOUR', 'double precision');
    table.specificType('VOLUME24HOUR', 'double precision');
    table.specificType('VOLUME24HOURTO', 'double precision');
    table.specificType('LOW24HOUR', 'double precision');
    table.specificType('HIGH24HOUR', 'double precision');
    table.specificType('PRICE', 'double precision');
    table.integer('LASTUPDATE');
    table.specificType('SUPPLY', 'double precision');
    table.specificType('MKTCAP', 'double precision');
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON raw
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('raw');
};
