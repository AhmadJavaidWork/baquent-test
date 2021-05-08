exports.up = async (knex) => {
  await knex.schema.createTable('display', async (table) => {
    table.increments('id').primary();
    table.string('fsym', 10).notNullable();
    table.string('tsym', 10).notNullable();
    table.unique(['fsym', 'tsym']);
    table.text('CHANGE24HOUR');
    table.text('CHANGEPCT24HOUR');
    table.text('OPEN24HOUR');
    table.text('VOLUME24HOUR');
    table.text('VOLUME24HOURTO');
    table.text('LOW24HOUR');
    table.text('HIGH24HOUR');
    table.text('PRICE');
    table.text('FROMSYMBOL');
    table.text('TOSYMBOL');
    table.text('LASTUPDATE');
    table.text('SUPPLY');
    table.text('MKTCAP');
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON display
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('display');
};
