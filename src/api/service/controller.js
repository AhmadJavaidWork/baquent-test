import queries from './queries';
import axios from 'axios';
import { dataSimplify, makeRes, formatQuery, paramError } from './herlper';

const API_URL = process.env.API_URL;

export const apiCall = async (req, res, done) => {
  try {
    const query = formatQuery(req.query);
    const apiResponse = await axios.get(
      `${API_URL}?fsyms=${query.fsyms}&tsyms=${query.tsyms}`
    );
    if (paramError(apiResponse)) return res.send(apiResponse.data);
    req.apiResponse = apiResponse;
    req.query = query;
    done();
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};

export const getPrice = async ({ apiResponse, query }, res) => {
  try {
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
