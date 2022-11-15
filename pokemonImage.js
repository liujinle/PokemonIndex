const superagent = require("superagent");
const fs = require("fs");
const imageUrl = 'https://www.pokemon.cn/play/resources/pokedex'
const url =
  "https://www.pokemon.cn/play/pokedex/api/v1?pokemon_ability_id=&zukan_id_from=1&zukan_id_to=898";

superagent.get(url).then((res) => {
  const data = JSON.parse(res.text);
  let pokemons_nosub = data.pokemons.filter((item) => item.zukan_sub_id === 0);
  let pokemons_sub = data.pokemons.filter((item) => item.zukan_sub_id !== 0);
  console.log(pokemons_sub);


  fs.writeFile('pokemons_nosub.json',JSON.stringify(pokemons_nosub),err=>{
    if(err){
        console.log(err);
    }
  })

  fs.writeFile('pokemons_sub.json',JSON.stringify(pokemons_sub),err=>{
    if(err){
        console.log(err);
    }
  })
});
