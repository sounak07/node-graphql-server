import axios from 'axios';

const API_ENDPOINTS = {
  COUNTRIES: 'https://restcountries.com/v3.1/name/',
  EXCHANGE_API: 'https://api.apilayer.com/fixer/latest?base=SEK',
};

const resolvers = {
  Query: {
    hello: () => 'Hello',
    getCountries: async (parent, { queryName }) => {
      const countries = await axios.get(
        `${API_ENDPOINTS.COUNTRIES}${queryName}`,
      );

      return countries.data.map(
        ({
          name: { official },
          population,
          currencies,
        }) => ({
          name: official,
          population,
          currencies: Object.keys(currencies),
        }),
      );
    },
    getCurrencyValues: async (parent, { sekValue, Countries }) => {
      const res = await axios.get(API_ENDPOINTS.EXCHANGE_API, { headers: { apikey: 'GUJCGFRVSnpcd1PIdoPBbshSTWzjjoVk' } });
      let currencyList = [];
      if (res.data && res.data.rates) {
        currencyList = Object.keys(res.data.rates);
      }

      const performExchange = (countryCurrency) => {
        if (currencyList.indexOf(countryCurrency) > -1) {
          return res.data.rates[countryCurrency];
        }
        return -1;
      };

      const results = Countries.reduce((final, country) => {
        country.currencies.forEach((curr) => {
          final.push({
            currency: curr,
            exchangeRates: performExchange(curr) * sekValue,
          });
        });
        return final;
      }, []);

      return results;
    },
  },
};

export default resolvers;
