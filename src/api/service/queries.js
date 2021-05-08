import knex from '../../services/knex';

const insertOrUpdate = (tableName, data) => {
  return knex(tableName).insert(data).onConflict(['fsym', 'tsym']).merge();
};

const getRaws = (fsyms, tsyms) => {
  return knex('raw').whereIn('fsym', fsyms).whereIn('tsym', tsyms);
};

const getDisplays = (fsyms, tsyms) => {
  return knex('display').whereIn('fsym', fsyms).whereIn('tsym', tsyms);
};

const saveData = async (raws, displays) => {
  const promises = [];
  raws.forEach((raw) => {
    promises.push(insertOrUpdate('raw', raw));
  });
  displays.forEach((display) => {
    promises.push(insertOrUpdate('display', display));
  });
  await Promise.all(promises);
};

const getDataFromDB = async (query) => {
  const fsyms = query.fsyms.split(',');
  const tsyms = query.tsyms.split(',');
  console.log(fsyms, tsyms);
  const rawPromise = getRaws(fsyms, tsyms);
  const displayPromise = getDisplays(fsyms, tsyms);
  const data = await Promise.all([rawPromise, displayPromise]);
  return { raws: data[0], displays: data[1] };
};

export default {
  saveData,
  getDataFromDB,
};
