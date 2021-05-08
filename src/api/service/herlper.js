export const dataSimplify = (data, query) => {
  const fsyms = query.fsyms.split(',');
  const tsyms = query.tsyms.split(',');
  const raws = [];
  const displays = [];
  fsyms.forEach((fsym) => {
    tsyms.forEach((tsym) => {
      const raw = {
        fsym: data.RAW[fsym][tsym].FROMSYMBOL,
        tsym: data.RAW[fsym][tsym].TOSYMBOL,
        CHANGE24HOUR: data.RAW[fsym][tsym].CHANGE24HOUR,
        CHANGEPCT24HOUR: data.RAW[fsym][tsym].CHANGEPCT24HOUR,
        OPEN24HOUR: data.RAW[fsym][tsym].OPEN24HOUR,
        VOLUME24HOUR: data.RAW[fsym][tsym].VOLUME24HOUR,
        VOLUME24HOURTO: data.RAW[fsym][tsym].VOLUME24HOURTO,
        LOW24HOUR: data.RAW[fsym][tsym].LOW24HOUR,
        HIGH24HOUR: data.RAW[fsym][tsym].HIGH24HOUR,
        PRICE: data.RAW[fsym][tsym].PRICE,
        LASTUPDATE: data.RAW[fsym][tsym].LASTUPDATE,
        SUPPLY: data.RAW[fsym][tsym].SUPPLY,
        MKTCAP: data.RAW[fsym][tsym].MKTCAP,
      };
      const display = {
        fsym: data.RAW[fsym][tsym].FROMSYMBOL,
        tsym: data.RAW[fsym][tsym].TOSYMBOL,
        CHANGE24HOUR: data.DISPLAY[fsym][tsym].CHANGE24HOUR,
        CHANGEPCT24HOUR: data.DISPLAY[fsym][tsym].CHANGEPCT24HOUR,
        OPEN24HOUR: data.DISPLAY[fsym][tsym].OPEN24HOUR,
        VOLUME24HOUR: data.DISPLAY[fsym][tsym].VOLUME24HOUR,
        VOLUME24HOURTO: data.DISPLAY[fsym][tsym].VOLUME24HOURTO,
        LOW24HOUR: data.DISPLAY[fsym][tsym].LOW24HOUR,
        HIGH24HOUR: data.DISPLAY[fsym][tsym].HIGH24HOUR,
        PRICE: data.DISPLAY[fsym][tsym].PRICE,
        LASTUPDATE: data.DISPLAY[fsym][tsym].LASTUPDATE,
        SUPPLY: data.DISPLAY[fsym][tsym].SUPPLY,
        MKTCAP: data.DISPLAY[fsym][tsym].MKTCAP,
      };
      raws.push(raw);
      displays.push(display);
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

const removeExtraFields = (data) => {
  if (data.fsym) delete data.fsym;
  if (data.tsym) delete data.tsym;
  if (data.id) delete data.id;
  if (data.updated_at) delete data.updated_at;
  if (data.created_at) delete data.created_at;
  return data;
};
