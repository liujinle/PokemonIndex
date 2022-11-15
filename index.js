const fs = require("fs");

let pokemons_all = [];
let pokemons_nosub = [];
pokemons_all = JSON.parse(fs.readFileSync("./pokemon_all.json", "utf-8"));
pokemons_nosub = JSON.parse(fs.readFileSync("./pokemons_nosub.json", "utf-8"));

// console.log(pokemons_all);
for (let index = 0; index < pokemons_all.length; index++) {
  const element = pokemons_all[index];
  element["imgUrl"] = pokemons_nosub[index].file_name;
  element["weight"] = pokemons_nosub[index].weight;
  element["height"] = pokemons_nosub[index].height;
}

console.log(pokemons_all);
fs.writeFile("pokemon_all.json", JSON.stringify(pokemons_all),(err)=>{
    if(err){
        console.log(err);
    }
});
