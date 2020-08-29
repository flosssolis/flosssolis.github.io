const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const movies = [
  { id: "1", name: "Pulp Fiction", genre: "Crime" },
  { id: "2", name: "1984", genre: "Sci-Fi" },
  { id: "3", name: "V for vendetta", genre: "Sci-Fi-Triller" },
  { id: "4", name: "Snatch", genre: "Crime-Comedy" },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id === args.id);
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: Query,
});
