import cron from 'node-cron';
import axios from 'axios';
import { dataSimplify } from '../../api/service/herlper';
import queries from '../../api/service/queries';

const API_URL = process.env.API_URL;

export default cron.schedule('*/10 * * * * *', async () => {
  try {
    const query = {
      fsyms: 'BTC,LINK,MKR,USD,EUR,ETH,LTC',
      tsyms: 'BTC,LINK,MKR,USD,EUR,ETH,LTC',
    };
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
