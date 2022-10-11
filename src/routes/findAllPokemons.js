const { Pokemon } = require("../db/sequelize");
const { Op } = require('sequelize')

module.exports = (app) => {
  app.get("/api/pokemons", (_req, res) => {
    if (_req.query.name) {
      const name = _req.query.name
    const limit = parseInt(_req.query.limit) || 5

    if (name.length < 2 ) {
        const message = 'le terme de recherche doit contenir au moins 2 lettres' 
        return res.status(400).json({message})
    }

      return Pokemon.findAndCountAll({ 
        where: {
         name: {
            [Op.like] : `%${name}%`  
         }
         },
        order : ['name'],
         limit : limit
        })
           
    .then(({count , rows}) => {
        const message = `il ya ${count } pokemons qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      })
    } else {
      Pokemon.findAll({order : ['name'] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = "la liste des pokemons n a pas pu etre trouvée";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
