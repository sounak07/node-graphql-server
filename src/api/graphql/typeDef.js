import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Countries {
        name: String
        population: Int
        currencies: [String]
    }

    type Currency {
        currency: String
        exchangeRates: Float
    }

    input countryList {
        name: String
        currencies: [String]
    }

    type Query {
        getCountries(queryName: String!): [Countries],
        hello: String
        getCurrencyValues(sekValue: Int!, Countries: [countryList]!): [Currency]
    }
`;

export default typeDefs;
