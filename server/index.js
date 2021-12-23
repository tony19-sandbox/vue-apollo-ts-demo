const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Country {
    code: String!
    name: String
  }

  type Query {
    getCountry(code: String): Country
  }
`

const country = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
]

const resolvers = {
  Query: {
    getCountry: (code = 'US') => country.find(c => c.code === code),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})