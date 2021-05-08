import cron from 'node-cron';
import axios from 'axios';
import { dataSimplify } from '../../api/service/herlper';
import queries from '../../api/service/queries';
import { fsymsArray, tsymsArray } from './coins';

const API_URL = process.env.API_URL;

var fsymsIndex = 0;
var tsymsIndex = 0;

export default cron.schedule('*/10 * * * * *', async () => {
  try {
    const query = {
      fsyms: fsymsArray[fsymsIndex].toString(),
      tsyms: tsymsArray[tsymsIndex].toString(),
    };
    const apiResponse = await axios.get(
      `${API_URL}?fsyms=${query.fsyms}&tsyms=${query.tsyms}`
    );
    if (apiResponse.data.Response !== 'Error') {
      const { raws, displays } = dataSimplify(apiResponse.data, query);
      await queries.saveData(raws, displays);
      console.log('SCHEDULER RAN');
      tsymsIndex++;
      if (tsymsIndex === tsymsArray.length) tsymsIndex = 0;
      if (tsymsIndex === 0) fsymsIndex++;
      if (fsymsIndex === fsymsArray.length) fsymsIndex = 0;
    }
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
});
