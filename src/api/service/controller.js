import queries from './queries';
import axios from 'axios';
import { dataSimplify, makeRes } from './herlper';
import cron from 'node-cron';
const API_URL = process.env.API_URL;

cron.schedule('*/10 * * * * *', async () => {
  try {
    const query = { fsyms: 'BTC,LINK,MKR', tsyms: 'USD,EUR,ETH,LTC' };
    const response = await axios.get(
      `${API_URL}?fsyms=${query.fsyms}&tsyms=${query.tsyms}`
    );
    const { raws, displays } = dataSimplify(response.data, query);
    await queries.saveData(raws, displays);
    console.log('DB UPDATED');
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
});

export const getPrice = async ({ query }, res) => {
  try {
    const apiResponse = await axios.get(
      `${API_URL}?//fsyms=${query.fsyms}&tsyms=${query.tsyms}`
    );
    if (apiResponse.data.Response === 'Error') {
      const { raws, displays } = await queries.getDataFromDB(query);
      const resObject = makeRes(raws, displays, query);
      return res.send(resObject);
    }
    const { raws, displays } = dataSimplify(apiResponse.data, query);
    await queries.saveData(raws, displays);
    const resObject = makeRes(raws, displays, query);
    return res.send(resObject);
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
