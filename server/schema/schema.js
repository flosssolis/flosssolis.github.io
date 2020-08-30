const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const directorsJson = [
//   { "name": "Quentin Tarantino", "age": 55 },
//   { "name": "Michael Radford", "age": 72 },
//   { "name": "James McTeique"," age": 51 },
//   { "name": "Guy Ritchie", "age": 50 },
// ];

// const moviesJson = [
//   {  "name": "Pulp Fiction"," genre": "Crime", "directorId": },
//   { "name": "1984"," genre": "Sci-Fi", "directorId": },
//   {  "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": },
//   {  "name": "Snatch", "genre": "Crime-Comedy", "directorId": },
//   {  "name": "Reservoir Dogs", "genre": "Crime", "directorId": },
//   {  "name": "The Hateful Eight", "genre": "Crime", "directorId": },
//   {  "name": "Inglourious basterds"," genre": "Crime", "directorId": },
//   {
//     "name": "Lock, Stock and Two Smoking Barrels",
//     "genre": "Crime-Comedy",
//     "directorId":
//   },
// ];

//{"_id":{"$oid":"5f4bc9ba5aed3cbe9ae18f67"},"name":"Michael Radford","age":{"$numberInt":"72"}}

//{"_id":{"$oid":"5f4bc78c5aed3cbe9add389e"},"name":"Quentin Tarantino","age":{"$numberInt":"55"}}

//{"_id":{"$oid":"5f4bca005aed3cbe9ae203e0"},"name":"James McTeique"," age":{"$numberInt":"51"}}

//{"_id":{"$oid":"5f4bca1a5aed3cbe9ae231b9"},"name":"Guy Ritchie","age":{"$numberInt":"50"}}

const movies = [
  { id: "1", name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: "2", name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: "3", name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: "4", name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: "5", name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: "6", name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: "7", name: "Inglourious basterds", genre: "Crime", directorId: "1" },
  {
    id: "8",
    name: "Lock, Stock and Two Smoking Barrels",
    genre: "Crime-Comedy",
    directorId: "4",
  },
];

const directors = [
  { id: "1", name: "Quentin Tarantino", age: 55 },
  { id: "2", name: "Michael Radford", age: 72 },
  { id: "3", name: "James McTeique", age: 51 },
  { id: "4", name: "Guy Ritchie", age: 50 },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id == parent.id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.directorId === parent.id);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id === args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: Query,
});
