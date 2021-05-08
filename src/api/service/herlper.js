export const dataSimplify = (data, query) => {
  const fsyms = query.fsyms.split(',');
  const tsyms = query.tsyms.split(',');
  const raws = [];
  const displays = [];
  fsyms.forEach((fsym) => {
    tsyms.forEach((tsym) => {
      if (
        data.RAW[fsym] &&
        data.RAW[fsym][tsym] &&
        data.RAW[fsym][tsym].FROMSYMBOL &&
        data.RAW[fsym][tsym].TOSYMBOL
      ) {
        const raw = rawStruct(data.RAW[fsym][tsym]);
        const display = displayStruct(
          data.RAW[fsym][tsym],
          data.DISPLAY[fsym][tsym]
        );
        raws.push(raw);
        displays.push(display);
      }
    });
  });
  return { raws, displays };
};

export const makeRes = (raws, displays, query) => {
  const res = {
    RAW: {},
    DISPLAY: {},
  };
  const fsyms = query.fsyms.split(',');
  const tsyms = query.tsyms.split(',');
  fsyms.forEach((fsym) => {
    res.RAW[fsym] = {};
    res.DISPLAY[fsym] = {};
    tsyms.forEach((tsym) => {
      res.RAW[fsym][tsym] = {};
      res.DISPLAY[fsym][tsym] = {};
      raws.forEach((raw) => {
        if (raw.fsym === fsym && raw.tsym === tsym) {
          raw = removeExtraFields(raw);
          res.RAW[fsym][tsym] = raw;
        }
      });
      displays.forEach((display) => {
        if (display.fsym === fsym && display.tsym === tsym) {
          display = removeExtraFields(display);
          res.DISPLAY[fsym][tsym] = display;
        }
      });
    });
  });
  return res;
};

export const formatQuery = (query) => {
  if (query.fsyms) query.fsyms = query.fsyms.toUpperCase();
  if (query.tsyms) query.tsyms = query.tsyms.toUpperCase();
  return query;
};

export const paramError = (apiResponse) => {
  if (
    apiResponse.data.Response === 'Error' &&
    (apiResponse.data.Type === 1 || apiResponse.data.Type === 2)
  ) {
    return true;
  }
};

const removeExtraFields = (data) => {
  if (data.fsym) delete data.fsym;
  if (data.tsym) delete data.tsym;
  if (data.id) delete data.id;
  if (data.updated_at) delete data.updated_at;
  if (data.created_at) delete data.created_at;
  return data;
};

const rawStruct = (raw) => {
  return {
    fsym: raw.FROMSYMBOL,
    tsym: raw.TOSYMBOL,
    CHANGE24HOUR: raw.CHANGE24HOUR,
    CHANGEPCT24HOUR: raw.CHANGEPCT24HOUR,
    OPEN24HOUR: raw.OPEN24HOUR,
    VOLUME24HOUR: raw.VOLUME24HOUR,
    VOLUME24HOURTO: raw.VOLUME24HOURTO,
    LOW24HOUR: raw.LOW24HOUR,
    HIGH24HOUR: raw.HIGH24HOUR,
    PRICE: raw.PRICE,
    LASTUPDATE: raw.LASTUPDATE,
    SUPPLY: raw.SUPPLY,
    MKTCAP: raw.MKTCAP,
  };
};

const displayStruct = (raw, display) => {
  return {
    fsym: raw.FROMSYMBOL,
    tsym: raw.TOSYMBOL,
    CHANGE24HOUR: display.CHANGE24HOUR,
    CHANGEPCT24HOUR: display.CHANGEPCT24HOUR,
    OPEN24HOUR: display.OPEN24HOUR,
    VOLUME24HOUR: display.VOLUME24HOUR,
    VOLUME24HOURTO: display.VOLUME24HOURTO,
    LOW24HOUR: display.LOW24HOUR,
    HIGH24HOUR: display.HIGH24HOUR,
    PRICE: display.PRICE,
    FROMSYMBOL: display.FROMSYMBOL,
    TOSYMBOL: display.TOSYMBOL,
    LASTUPDATE: display.LASTUPDATE,
    SUPPLY: display.SUPPLY,
    MKTCAP: display.MKTCAP,
  };
};
