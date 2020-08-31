const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");

const app = express();

const PORT = 3005;

mongoose.connect(
  "mongodb+srv://newUs:123@movies-tut.wnnqw.mongodb.net/movies-tut?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error:${err}`));
dbConnection.once("open", () => console.log("Connected to Db!"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started");
});
