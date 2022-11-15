const { rejects } = require("assert");
const Crawler = require("crawler");
const fs = require("fs");
const { resolve } = require("path");

let crawler = new Crawler({
  timeout: 10000,
  jQuery: true,
});

function getPokemon() {
  let url ='https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89'
  let data = [];
  return new Promise((resolve, rejects) => {
    crawler.queue({
      url,
      callback: (err, res, done) => {
        if (err) rejects(err);
        let $ = res.$;
        try {
          let $tr = $(".roundy.eplist tr");
          $tr.each((i, el) => {
            let $td = $(el).find("td");
            let _code = $td.eq(1).text().split("\n")[0];
            let _name = $td.eq(3).text().split("\n")[0];

            let _attr = $td.eq(4).text().split("\n")[0];

            let _other = $td.eq(5).text().split("\n")[0];

            _attr = _other.indexOf("属性") != -1 ? _attr : `${_attr}+${_other}`;
            if (_code) {
              data.push([_code, _name, _attr]);
            }
          });
          done();
          resolve(data);
        } catch (err) {
          done();
          rejects(err);
        }
      },
    });
  });
}

getPokemon().then(async (data) => {
  console.log(data);
});
