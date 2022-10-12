const express = require("express");
const favicon = require("serve-favicon");
const bodyparser = require("body-parser");
const sequelize = require ("./src/db/sequelize");


const app = express();
const port = process.env.PORT || 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyparser.json());

  sequelize.initDb()
  app.get('./',(_req,res) => {
    res.json('hello,heroku')
  })

// ici nous placerons nos futurs points de terminaison
require ('./src/routes/findAllPokemons')(app)
require ('./src/routes/findPokemonByPk')(app)
require ('./src/routes/createPokemon')(app)
require ('./src/routes/updatePokemon')(app)
require ('./src/routes/deletePokemon')(app)
require ('./src/routes/login')(app)

// ajoute la gestion des erreurs 404
app.use(({res}) => {
  const message = 'impossible de trouver la ressource demandée!'
  res.status(404).json({message})
})

app.listen(port, () =>console.log(`notre application Node est demarree sur : http://localhost: ${port}`));
